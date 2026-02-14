const userRepository = require("../repositories/userRepository");

function authMiddleware (req,res,next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(' ')[1]; // Bearer <token>
    if(!token.startsWith("fake-jwt-token")){
        return res.status(401).json({ message: "Invalid token" });
    }
    const email = token.replace("fake-jwt-token", "");
    const user = userRepository.findByEmail(email); 
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
}
module.exports = authMiddleware;