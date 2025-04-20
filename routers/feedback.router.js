const router = require("express").Router()
const { getAllFeedBack,createFeedback, likeFeedback, dislikeFeedback, getTopRatedUsers, getFeedbackGroupedByTrack } = require("../services/feedback.service")

router.post("/create",createFeedback)
router.post("/like/:id",likeFeedback)
router.post("/dislike/:id",dislikeFeedback)
router.get("/get/:id",getAllFeedBack)
router.get("/top/ranking",getTopRatedUsers)
router.get("/tracks",getFeedbackGroupedByTrack)


module.exports = router