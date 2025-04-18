const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.AuthUser = async (req, res, next) => {

    const token = req.header("Authorization")?.split(" ")[1] || res.cookies?.token;
    if (!token) return res.status(401).json({ 
        msg: "No token Found, authorization denied" 
    });

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ 
            error: "Server Error" 
        });
    }
}