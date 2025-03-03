const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre('save', async function (next) {
    const user = this;
    try {
        if (!user.isModified('password')) {
            return next()
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, genSalt);
        user.password = hashPassword;
    } catch (error) {
        console.log(error);
    }
});
userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.password) return false; 
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
    return token;
}

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);