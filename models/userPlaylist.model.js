const mongoose = require("mongoose");

const userPlaylistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    music: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }], 
});

const UserPlaylistModel = mongoose.model("UserPlaylist", userPlaylistSchema, "UserPlaylist");

module.exports = { UserPlaylistModel };
