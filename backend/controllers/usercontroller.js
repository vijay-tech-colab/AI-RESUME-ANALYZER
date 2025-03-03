const {catchAsyncError} = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../middleware/errorClass');
const cloudinary = require('cloudinary').v2;
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/sendJWTToken');
const crypto = require('crypto');
exports.postRegisterUser = catchAsyncError(async (req, res, next) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists with this email", 400));
    }
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.avatar) {
        return next(new ErrorHandler("Please upload an avatar", 400));
    }

    const { avatar } = req.files;
    let cloudinaryResponseForAvatar;
    try {
        cloudinaryResponseForAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, {
            folder: "Avatar"
        });

        if (!cloudinaryResponseForAvatar) {
            return next(new ErrorHandler("Avatar upload failed", 500));
        }
    } catch (error) {
        return next(new ErrorHandler("Avatar upload failed", 500));
    }

    const user = await User.create({
        username,
        email,
        password,
        role,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url
        }
    });

    sendToken(201, "User registered successfully", res, user, true);
});

exports.postLoginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(200, "User logged in successfully", res, user, true);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "User logged out successfully"
    });
});


exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {};
    if (req.body.username) newUserData.username = req.body.username;
    if (req.body.email) newUserData.email = req.body.email;

    if (req.files && req.files.avatar) {
        const user = await User.findById(req.user.id);

        // Remove old avatar from cloudinary
        await cloudinary.uploader.destroy(user.avatar.public_id);

        // Upload new avatar to cloudinary
        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
            folder: "Avatar"
        });

        newUserData.avatar = {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
});


exports.deleteUserAccount = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Remove user avatar from cloudinary
    await cloudinary.uploader.destroy(user.avatar.public_id);
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
        success: true,
        message: "User account deleted successfully"
    });
});


exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
    const { newPassword, oldPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });
});


exports.forgotUserPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:5000/api/v1/user/password-reset/${resetToken}`;

    const options = {
        to: user.email,
        subject: "Password Reset Token",
        text: `Your password reset token is: \n\n ${resetPasswordUrl} \n\n If you did not request this, please ignore this email.`
    };

    try {
        await sendEmail(options);
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        console.error("Email Sending Error:", error);
        return next(new ErrorHandler("Email could not be sent", 500));
    }

    res.status(200).json({
        success: true,
        message: `Password reset token sent to ${user.email}`,
        resetPasswordUrl
    });
});

exports.resetUserPassword = catchAsyncError(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');    
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetPasswordToken : hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Invalid or expired password reset token", 400));
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password reset successfully"
    });
});

exports.profileMe = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

