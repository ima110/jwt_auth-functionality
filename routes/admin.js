const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,User,Course} = require("../db/index");
const jwt = require("jsonwebtoken");
const secret = require("../Secret/key-gen");


// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const Username = req.body.Username;
    const Password = req.body.Password;
    try {
        await Admin.create({
            Username, 
            Password
    });
    res.status(200).json({msg: 'Admin created successfully'})
    } catch (error) {
        res.status(404).json({error: "Somehing wrong in /admin/signin route"});
    }
    
});

router.post('/signin',async(req, res) => {
    // Implement admin signup logic
    const {Username, Password} = req.body;
    const adm = await Admin.findOne({Username,Password});
    if(!adm){
       return res.status(404).json({msg:"Incorrect username or password "});
    }
    else{
        const key = secret(Username + Password);
        const payload = {username : Username}
        const token = jwt.sign(payload,key);
        adm.Flag = key
        adm.Token = "Bearer "+token;
        await adm.save();
        return res.status(200).json({msg:"User successfully signin"});
    }   
    }
)    
router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    try {
        await Course.create({
            Title : title,
            Description : description,
            price : price,
            Image : image
        });
        return res.status(200).json({msg:"Course added successfully"});
    } catch (error) {
        console.log("Something wrong in admin/course route");
    }
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports= router;