const { createPost, getAllPost, updatePost, deletePost } = require("../services/post.service")

const router = require("express").Router()

router.post("/create",createPost)
router.get("/all",getAllPost)
router.put("/update/status/:id",updatePost)
router.delete("/del/:id",deletePost)

module.exports = router