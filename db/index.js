const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://abidiahmad725:k7ibajtfe4iFolOB@cluster0.anb5fii.mongodb.net/todo-jwt?retryWrites=true&w=majority&authSource=admin'
).then(()=>{console.log("DB connected")}).catch((e)=>{
    console.log(e);
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
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
        type : Boolean,
        default : false
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    Username : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true,
        match : /^[a-zA-Z0-9@#$%&*]+$/
    },
    Token : String,
    Flag :{
        type : String,
        required : true
    },
    Purchased:{

    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
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