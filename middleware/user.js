const jwt = require("jsonwebtoken");
const {User} = require("../db/index");
async function userMiddleware(req, res, next) {
    // user authentication
    try {
        const username = req.headers.username;
        const authKey = req.headers.authorization
        const token = authKey.split(" ")[1];
        const auth =await User.findOne({Username:username})
        if(!auth){
            return res.status(401).json({msg:"Inavlide user"});
        }
        const key = auth.Flag;
        const varification =jwt.verify(token,key);
        if(!varification){
            return res.status(401).json({msg:"Token expires"})
        }
        next();
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports = userMiddleware;