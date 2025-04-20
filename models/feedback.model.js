const mongoose = require("mongoose")



const feedBackSchema = mongoose.Schema({
    feedbackBy:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    feedbackTo:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    trackId:{type:mongoose.Schema.Types.ObjectId,ref:"Tracks"},
    msg:{type:String,default:""},
    totalLikes:{type:Number,default:0},
    totalDisLikes:{type:Number,default:0},
    totalStars:{type:Number,default:0},
    createdAt: { type: Date, default: Date.now }
})



const FeedBackModel = mongoose.model("FeedBack",feedBackSchema,"FeedBack")


module.exports ={ FeedBackModel }
