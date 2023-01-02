const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    for : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

const Feedback = mongoose.model("Feedback",feedbackSchema)

module.exports = Feedback