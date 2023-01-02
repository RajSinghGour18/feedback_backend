const {Router} = require("express")
const { getFeedbacks, createFeedback } = require("../controllers/feedbackControllers")
const router = Router()
const protect = require("../middleware/authMiddleware")

router.get("/",protect,getFeedbacks)
router.post("/",createFeedback)

module.exports = router