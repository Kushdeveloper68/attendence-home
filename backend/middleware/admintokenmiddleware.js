const jwt = require('jsonwebtoken');
const key = process.env.SECRETJSONKEY || 'kush123'
// check jwt token to authenticate user or not (middleware)
const admintokenCheckMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token, key, process.env.SECRETJSONKEY)
    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }
    jwt.verify(token,key , (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate or invaild token.' });
        }
        if(decoded.user.role !== 'admin'){
            return res.json({ success: false, message: 'Access denied. Admins only.' });
        }
           console.log("admin get", true)
        req.user = decoded.user;
        next();
    }); 
}

module.exports = admintokenCheckMiddleware;