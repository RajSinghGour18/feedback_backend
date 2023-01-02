const {Router} = require("express")
const { login, signup } = require("../controllers/userControllers")

router = Router()

router.post("/login",login)

router.post("/signup",signup)

module.exports = router