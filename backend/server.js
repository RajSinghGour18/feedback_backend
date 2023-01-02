const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const errorHandler = require("./middleware/errorHandler")

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server started on PORT : ${PORT}`))

mongoose.set('strictQuery',false)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch((e)=>console.log(e))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/user",require("./routes/userRoutes"))
app.use("/api/feedbacks",require("./routes/feedbackRoutes"))

app.use(errorHandler)