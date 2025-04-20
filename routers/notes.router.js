const { createNote, getUserNotes, deleteNote, getAISuggestion, updateNote } = require("../services/notes.service")

const router = require("express").Router()

router.post("/create",createNote)
router.get("/get/:id",getUserNotes)
router.post("/get/ai/suggestion",getAISuggestion)
router.delete("/del/:id",deleteNote)
router.put("/update/:id",updateNote)

module.exports = router