const sendToken = (statusCode, message, res, user, success) => {
    const token = user.generateJWTToken();
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie("token", token, cookieOptions).status(statusCode).json({
        success,
        message,
        user
    });
}

module.exports = sendToken;