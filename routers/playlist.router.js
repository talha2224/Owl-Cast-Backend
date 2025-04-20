const router = require("express").Router()
const { createPlaylist, getAllPlaylist } = require("../services/playlist.service")

router.post("/create",createPlaylist)
router.get("/:id",getAllPlaylist)


module.exports = router