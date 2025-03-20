const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    let token = req.headers['authorization'];
    
    // ✅ Ensure token exists and follows "Bearer <token>" format
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // 🔹 Extract token after "Bearer "
    token = token.split(" ")[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 🔹 Attach user data to request
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = isAuthenticated;
