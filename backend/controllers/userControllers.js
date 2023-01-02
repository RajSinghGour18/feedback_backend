const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

const signup = asyncHandler(async(req,res)=>{
    const {name,password} = req.body
    
    if(!name || !password){
        throw new Error("Send all Details")
    }

    const exists = await User.findOne({name})

    if(exists) throw new Error("Username Already Exists")

    const salt = await bcrypt.genSalt(5)

    const hashed = await bcrypt.hash(password,salt)

    const createdUser = await User.create({
        name , 
        password : hashed
    })

    if(createdUser) res.status(200).json({message:"User Created"})

    else throw new Error("Something went wrong")

})

const login = asyncHandler(async(req,res)=>{
    const {name,password} = req.body

    if(!name || !password){
        throw new Error("Send all Details")
    }

    const found = await User.findOne({name})

    if(!found) throw new Error("Invalid Credentials")

    const isValid = await bcrypt.compare(password,found.password)

    if(!isValid) throw new Error("Invalid Credentials")

    const token = jwt.sign({id:found._id,name:found.name},process.env.JWT_SECRET)

    res.json({token})
})

module.exports = {login,signup}