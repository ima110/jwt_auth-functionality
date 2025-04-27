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
    const crossCheck = await Admin.findOne({Username, Password})
    if(crossCheck){
        return res.status(409).json({msg:"Conflict error"});
    }
    try {
        await Admin.create({
            Username, 
            Password
    });
    res.status(200).json({msg: 'Admin created successfully'})
    } catch (error) {
        res.status().json({error: "Somehing wrong in /admin/signin route"});
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

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    try {
        const course =await Course.find({});
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({msg:"Code broked at get /course route"});
    }
});

router.patch("/courses/launch/:id",adminMiddleware,async(req,res)=>{
    try {
        const id = req.params.id;
        
            const course =await Course.findById(id);
        if(!course){
            return res.status(404).json({msg:"Course not found"});  
        }
        
        course.Launched = true 
        await course.save();
        return res.status(200).json({msg:"Course Launched successfully"});
        
    } catch (error) {
        return res.status(500).json({msg:"code broked in upadting launch"});
    }
})

module.exports= router;