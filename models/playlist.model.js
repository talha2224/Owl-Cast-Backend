const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema, "Playlist");

module.exports = { PlaylistModel };
