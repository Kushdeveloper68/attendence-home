const jwt = require('jsonwebtoken');
const key = process.env.SECRETJSONKEY || 'kush123'
// check jwt token to authenticate user or not (middleware)
const tokenCheckMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token, key, process.env.SECRETJSONKEY)
    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }
    jwt.verify(token,key , (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate or invaild token.' });
        }
        req.user = decoded.user;
        next();
    }); 
}

module.exports = tokenCheckMiddleware;