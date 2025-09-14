const jwt = require('jsonwebtoken');

// check jwt token to authenticate user or not (middleware)
const tokenCheckMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRETJSONKEY, (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token' });
        }
        req.user = decoded.user;
        next();
    }); 
}

module.exports = tokenCheckMiddleware;