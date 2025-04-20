const mongoose = require("mongoose")



const performanceSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Account"},
    smoothness:{type:Number,default:0},
    creativity:{type:Number,default:0},
    versatility:{type:Number,default:0},
    createdAt: { type: Date, default: Date.now }
})



const PerformanceModel = mongoose.model("Performance",performanceSchema,"Performance")


module.exports ={ PerformanceModel }