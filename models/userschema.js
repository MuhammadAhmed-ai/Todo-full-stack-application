import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
    },
    gender:{
        type : String,
        required : true,
        enum :  ["male" , "Male" , "female" , "Female" ]
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    createAt :{
        type : Date,
        default : Date.now()
    }


})

const usermodel = mongoose.model("user" , userschema)
export default usermodel