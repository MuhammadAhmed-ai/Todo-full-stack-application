import mongoose from "mongoose"
const appSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    status:{
        type : String,
        required : true 
    },
    priority:{
        type : String,
        required : true
    },
    duedate : {
        type : String,
        required : true
    },
    userId :{
        type : String,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }
})


const taskmodel = mongoose.model("task" , appSchema)
export default taskmodel