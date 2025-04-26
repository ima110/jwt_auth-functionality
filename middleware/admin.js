const {Admin} = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({msg:"Token missing"});
        }
        const auth= await Admin.findOne({Token:token});
        if(!auth){
            return res.status(401).json({msg:"invalide Token"});
        }
        else{
            next();
        }
    } catch (error) {
        console.log("Somethis wrong in adminMiddleware");
    }
}
module.exports = adminMiddleware;