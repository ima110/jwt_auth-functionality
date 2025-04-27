const {Admin} = require("../db/index");
const jwt = require("jsonwebtoken");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
        const username = req.headers.username;
        const authKey = req.headers.authorization;
        if(!authKey){
            return res.status(401).json({msg:"authorization token missing in header"});
        }
        const token = authKey.split(" ")[1]
        if(!username){
            return res.status(401).json({msg:"username missing in header"});
        }
        const adm= await Admin.findOne({Username:username});
        if(!adm){
            return res.status(401).json({msg:"invalide username"});
        }
        const key = adm.Flag;
        try {
           const auth = jwt.verify(token,key);
           next();
        } catch (error) {
            return res.status(500).json({msg:"Invalide token"})
        }  
    }catch (error) {
        return res.status(500).json({msg:"Code broked in adminMiddleware"});
    }}

module.exports = adminMiddleware;