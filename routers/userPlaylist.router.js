const { createPlaylist, getAllPlaylist, updatePlaylist } = require("../services/userPlaylist.service")

const router = require("express").Router()

router.post("/create",createPlaylist)
router.get("/:id",getAllPlaylist)
router.put("/:id",updatePlaylist)



module.exports = router