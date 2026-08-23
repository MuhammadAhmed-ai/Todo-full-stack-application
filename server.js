import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import usermodel from "./models/userschema.js"
import jwt from "jsonwebtoken"
import authmiddleware from "./middelware/authmiddleware.js"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))
import { setServers } from "node:dns/promises";
import taskmodel from "./models/taskmodel.js"
await setServers([
  "8.8.8.8", // Google DNS
  "1.1.1.1"  // Cloudflare DNS
]);


const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(()=>{
    console.log("mein connect hogay hun")
})
.catch((error)=>{
    console.log("mein connect nahi hua haun", error)
})


app.post("/sign-up", async (req , res)=>{
    try {
        const body = req.body
        const user = await usermodel.findOne({email : body.email})
        if(user){
            return res.json({
                message : "email address is already exist",
                data : null,
                status : false
            })
        }

        const userPassword = body.password
        const hashpassword = await bcrypt.hash(userPassword , 10)
        const obj = {
            ...body,
            password : hashpassword
        }

        const userRes = await usermodel.create(obj)
        console.log(userRes)
        res.json({
            message : "user has successfully signup",
            data : userRes,
            status : true
        })
    } catch (error) {
        res.json({
        message : error.message || "Some thing went wrong",
        data : null
        })
    }
})



app.post("/api/login" , async (req,res)=>{
    try {
        const {email , password} = req.body
        const user = await usermodel.findOne({email})
        console.log(user)
        
        if(!user){
            return res.json({
                message : "invalid email or password",
                status : false,
                data : null
            })
        }
        
        const ispasscheck = await bcrypt.compare(password , user.password)
        if(!ispasscheck){
            return res.json({
                message : "invaliad email or password"
            })
        } 

        const userData = {
         _id: user._id,
         firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        email: user.email
};

        // const token = jwt.sign({userId : user._id}, "mysecretkey" , {expiresin : "1d"})
        const token = jwt.sign({userId : user._id} , process.env.JWT_SECRET , {expiresIn : "1d"})
       return res.json({
        message : "user successfully login" ,
        status : true,
        data : userData,
        token : token,
       })


    } catch (error) {
        res.json({
            message : error.message || "Some thing went wrong",
            data : null
        })
    }
})


app.post("/create-task" , authmiddleware, async(req,res)=>{
    try {
        const body = req.body
        const userId = req.user.userId
        const taskdata = {
            ...body,
            userId : userId
        }
        console.log(body)

        const userdata = await taskmodel.create(taskdata)
        res.json({
            message : "user is created",
            status : true,
            data : userdata
        })
    } catch (error) {
        res.json({
            message : error.message || "sme thing went worng",
            status : false,
            data : null
        })
    }
})

app.get("/get-task" ,authmiddleware , async (req,res)=>{
    try {
       const alltask = await taskmodel.find({
        userId : req.user.userId
       })
       res.json({
        message : "user fetch successfully",
        status : true,
        data : alltask
    })
    } catch (error){
        res.json({
            message : error.message || "some thing went wrong",
            data : null,
            status : false
        })
    }
})

app.get("/get-task/:id" , async (req,res)=>{
    try {
        const Taskid = req.params.id
        const taskRes = await taskmodel.findById(Taskid)
        console.log(taskRes)
        if(!taskRes){
             res.json({
                message : "User not found",
                status : false,
                data : null 
        })
        }

        if(taskRes){
            res.json({
                message : "signle user fetch",
                data : taskRes,
                status : true,
            })
        }
    } catch (error) {
        res.json({
            message : error.message || "some thing wnet wrong",
            data : null,
            status : false
        })
    }
})

app.put("/update-task/:id", authmiddleware , async (req,res)=>{
    try {
        const body = req.body
        const taskid = req.params.id
        const userId = req.user.userId
        const updatetask = await taskmodel.findOneAndUpdate(
            { _id: taskid,userId: userId} ,
            body , 
            {new : true})

            if (!updatetask) {
         return res.json({
            message: "Task not found or you are not authorized",
            data: null,
            status: false
            });
        }
        res.json({
            message : "Task updated successfully",
            data : updatetask,
            status : true
        })
    } catch (error) {
        res.json({
            Message : error.message,
            data : null,
            status : false
        })
    }
})

app.delete("/delete-task/:id" ,authmiddleware,  async(req,res)=>{
    try {
       const {id} = req.params
       const userId = req.user.userId
       const deletetask = await taskmodel.findOneAndDelete({
         _id: id,
        userId: userId
       })

       if(!deletetask){
           return res.json({
                message: "Task not found or you are not authorized",
                data: null,
                status: false
            });
       }
       res.json({
        message : "taskis successfully deleted",
        data : deletetask,
        status : true
       })
    } catch (error) {
        res.json({
            message : error.message,
            status : false,
            data : null
        })        
    }
})



app.listen(PORT , ()=>{console.log(`server is running on ${PORT}`)})