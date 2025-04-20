const router = require("express").Router()
const { multipleupload } = require("../config/multer.config")
const { uploadMusic, getAllMusic, getAllByPlaylistId, getAllByCreatorId, increaseDownload, addListener, changeStatus, getTopMusicByListeners } = require("../services/music.service")

router.post("/upload",multipleupload.fields([{ name: 'image', maxCount: 1 },{ name: 'audio', maxCount: 1}]),uploadMusic)
router.get("/all",getAllMusic)
router.get("/trending",getTopMusicByListeners)
router.get("/playlist/:id",getAllByPlaylistId)
router.get("/creator/:id",getAllByCreatorId)
router.get("/download/:id",increaseDownload)
router.put("/listener/:id",addListener)
router.put("/listener/:id",addListener)
router.put("/status/:id",changeStatus)



module.exports = router