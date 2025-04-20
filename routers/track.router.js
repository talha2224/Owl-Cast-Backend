const router = require("express").Router()
const { multipleupload } = require("../config/multer.config")
const { postTrack, getAllTracks, getAllTracksByUser, getSingleTrack, changeVisiblity, likeTrack, dislikeTrack, getAiSuggestionOnRap, getAllTracksForAdmin, approveTrack, declineTrack, getAiSuggestionOnAnalytics } = require("../services/track.service")

router.post("/create",multipleupload.single("recording"),postTrack)
router.post("/get/suggestion",multipleupload.single("recording"),getAiSuggestionOnRap)
router.get("/all",getAllTracks)
router.get("/admin/all",getAllTracksForAdmin)
router.get("/user/:id",getAllTracksByUser)
router.get("/single/:id",getSingleTrack)
router.put("/change/visiblity/:id",changeVisiblity)
router.post("/like/:id",likeTrack)
router.post("/dislike/:id",dislikeTrack)
router.put("/admin/approved/:id",approveTrack)
router.put("/admin/decline/:id",declineTrack)
router.get("/analysis/:id",getAiSuggestionOnAnalytics)



module.exports = router