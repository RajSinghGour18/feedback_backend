const Feedback = require("../models/feedbackModel")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const getFeedbacks = asyncHandler(async(req,res)=>{
    const {id} = req.user

    const feedbacks = await Feedback.find({for:id})

    res.json(feedbacks)

})

const createFeedback = asyncHandler(async(req,res)=>{
    const {name,message} = req.body

    if(!name || !message) throw new Error("Send all Details")

    const found = await User.findOne({name})

    if(!found) throw new Error("No User Found")

    const created = await Feedback.create({
        for: found._id,
        message
    })

    if(created) res.json({message:"Feedback Delivered"})
    else throw new Error("Something went Wrong")

})

module.exports = {getFeedbacks,createFeedback}