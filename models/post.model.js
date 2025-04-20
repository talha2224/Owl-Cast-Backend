const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    msg: { type: String, required: true },
    status: { type: String,default:"Published"},
    createdAt: { type: Date, default: Date.now }
});

const PostModel = mongoose.model("Post", postSchema, "Post");

module.exports = { PostModel };
