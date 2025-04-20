const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    type: { type: String, default: "Music" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    playlistId: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist",default:null,required:false,set: v => v === "null" || v === "" ? null : v},
    audio: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    listeners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    downloaded: { type: Number, default: 0 },
    status: { type: String, default: "Active" }
},{ timestamps: true });


const MusicModel = mongoose.model("Music", musicSchema, "Music");

module.exports = { MusicModel };
