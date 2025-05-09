const router = require("express").Router()
const { createPlaylist, getAllPlaylist, getPlaylist } = require("../services/playlist.service")

router.post("/create",createPlaylist)
router.get("/all",getPlaylist)
router.get("/:id",getAllPlaylist)


module.exports = router