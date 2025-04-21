const mongoose = require("mongoose")



const AccountSchema = mongoose.Schema({
    role:{type:String,default:"user"},
    firstName:{type:String,default:null},
    lastName:{type:String,default:null},
    email:{type:String,required:true},
    password:{type:String},
    aspect:{type:String,default:null},
    dob:{type:String,default:null},
    country:{type:String,default:null},

    profile:{type:String,default:null},
    otp:{type:Number,default:null},
    otpVerified:{type:Boolean,default:false},

    isSubscribed:{type:Boolean,default:false},
    planName:{type:String,default:"free"},
    createdAt: { type: Date, default: Date.now },
})



const AccountModel = mongoose.model("Account",AccountSchema,"Account")


module.exports ={ AccountModel }