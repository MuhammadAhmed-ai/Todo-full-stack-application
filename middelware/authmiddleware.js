import jwt from "jsonwebtoken"
const authmiddleware = (req, res , next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.json({
                message : "authorization tokn is req",
                status : false
            })
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return res.json({
                message : "token is missing",
                status : false
            })
        }

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded
         next()

    } catch (error) {
        res.json({
            Message : "Invalid or expired token",
            status : false,
            data : null
        })
    }
}

export default authmiddleware