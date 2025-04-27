const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index");
const secret = require("../Secret/key-gen");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup',async (req, res) => {
    //user signup 
    const username = req.body.username;
    const password = req.body.password;
    const auth =await User.findOne({Username:username});
    if(auth){
        return res.status(409).json({msg:"User exists"})
    }
    try {
        await User.create({
            Username : username,
            Password : password
        })
        return res.status(201).json({msg:"User created successfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/signin',async (req, res) => {
    //admin signup
    const username = req.body.username;
    const password = req.body.password;
    try {
       const auth =await User.findOne({Username:username,Password:password});
       if(!auth){
        return res.status(401).json({msg:"Invalide username or password"});
       }
       const key = secret(username + password);
       auth.Flag = key;
       const token = jwt.sign({username},key,{ expiresIn: "1h" });
       auth.Token = `Bearer ${token}`;
       await auth.save();
       return res.status(200).json({msg:"User successfully signed in"}); 
    } catch (error) {
        return res.status(500).json({msg:"code broked in signin route"});
    }
});

router.get('/courses',async (req, res) => {
    //listing all courses(launched)
    try {
        const course =await Course.find({Launched:true})
        res.status(200).json(course);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    //course purchase
    const id = req.params.courseId;
    const username = req.headers.username
    try {
        const course =await Course.findById(id);
        if(!course){
            return res.status(404).json({msg:"Invalide course id"});
        }
        const user = await User.findOne({Username: username});
        if(!user){
            return res.status(404).json({msg:"user naot found"});
        }
        user.Purchased.push(course._id);
        await user.save();
        return res.status(200).json({msg:"Coursed added successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Error while adding user"});
    }
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    //fetching purchased courses
    try{
    const username = req.headers.username;
    const user =await User.findOne({Username:username});
    if(!user){
        return res.status(404).json({msg:"invalide user"});
    }
    return res.status(200).json(user.Purchased);
}catch(error){
    console.log(error);
    return res.status(500).json({msg:"Unable to retrieve purchased courses"});
}
});

module.exports = router