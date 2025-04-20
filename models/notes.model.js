const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const NoteModel = mongoose.model("Note", noteSchema, "Notes");

module.exports = { NoteModel };
