const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://abidiahmad725:k7ibajtfe4iFolOB@cluster0.anb5fii.mongodb.net/todo-jwt?retryWrites=true&w=majority'
).then(()=>{console.log("DB connected")}).catch((e)=>{
    console.log(e);
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    Username : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true,
        match : /^[a-zA-Z0-9@#$%&*]+$/
    },
    Token : {
        type : String,
        required : false
    },
    Flag :{
        type : String,
        required : false
    }
});

const UserSchema = new mongoose.Schema({
    Username : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true,
        match : /^[a-zA-Z0-9@#$%&*]+$/
    },
    Token : {
        type:String,
        required : false
    },    
    Flag :{
        type : String,
        required : false
    },
    Purchased:[]
});

const CourseSchema = new mongoose.Schema({
    Title : {
        type : String,
        required : true
    },
    Description: {
        type : String,
        required : true 
    },
    price : {
        type : Number,
        required : true
    },
    Image : {
        type : String,
        required : false
    },
    Launched :{
        type: Boolean,
        default:false
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}