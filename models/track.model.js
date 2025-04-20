const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    title: { type:String, required: true },
    description: { type: String, required: true },
    recording:{type:String,required:true},
    hashTags:{type:Array,default:[]},
    visiblity:{type:Boolean,default:true},
    totalLikes:{type:Number,default:0},
    totalDisLikes:{type:Number,default:0},
    createdAt: { type: Date, default: Date.now },
    approved:{type:Boolean,default:false},
    decline:{type:Boolean,default:false}
});

const TracksModel = mongoose.model("Tracks", trackSchema, "Tracks");

module.exports = { TracksModel };
