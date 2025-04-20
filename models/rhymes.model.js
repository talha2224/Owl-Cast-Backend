const mongoose = require("mongoose");

const rhymeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    word:{type:String,required:true},
    rhymes:{type:Array,default:[]},
});

const RhymesModel = mongoose.model("Rhymes", rhymeSchema, "Rhymes");

module.exports = { RhymesModel };
