const sendToken = (statusCode, message, res, user, success) => {
    const token = user.generateJWTToken();
    console.log("Generated Token:", token);

    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiry
        httpOnly: true, // Prevent client-side access for security
    };


    res.cookie("token", token, cookieOptions)
        .status(statusCode)
        .json({
            success,
            message,
            user,
            token
        });
};

module.exports = sendToken;
