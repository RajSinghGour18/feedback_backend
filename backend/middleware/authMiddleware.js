const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            const token = req.headers.authorization.split(" ")[1]
            const user = jwt.verify(token,process.env.JWT_SECRET)
            req.user = user
            next()
        }
        catch(e){
            throw new Error("Not Authorized")
        }
    }
    else{
        throw new Error("Not Authorized")
    }
}

module.exports = authMiddleware