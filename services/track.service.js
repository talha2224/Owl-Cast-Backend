const { FeedBackModel } = require("../models/feedback.model");
const { NotificationModel } = require("../models/notification.model");
const { PerformanceModel } = require("../models/performance.model");
const { TracksModel } = require("../models/track.model");
const { uploadFile, audioToText, aISuggestionOnRap, aIPerformanceAnalysis } = require("../utils/function");



const postTrack = async (req,res) =>{
    try {
        let {userId,title,description,hashTags,visiblity} = req.body
        let recording = req.file
        let recordingUrl = await uploadFile(recording);
        let text = await audioToText(recordingUrl)
        let performance = await aIPerformanceAnalysis(text)
        const cleanJsonString = performance.replace(/```json|```|performance|\n/g, '').trim();
        const jsonObject = JSON.parse(cleanJsonString);
        let final = { ...jsonObject, userId };
        let data = await TracksModel.create({userId,title,description,hashTags,visiblity,recording:recordingUrl})
        await PerformanceModel.create(final)
        return res.status(200).json({data:data,msg:"Track Posted",status:200})

    } 
    catch (error) {
        console.log(error)
    }
}

const getAllTracks = async (req,res) =>{
    try {
        let finalData = []
        let data = await TracksModel.find({visiblity:true,approved:true}).populate("userId")
        for (const element of data) {
            let feedback = await FeedBackModel.find({trackId:element?._id});
            let prepareData = {track:element,feedback}
            finalData.push(prepareData)
        }
        return res.status(200).json({data:finalData,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const getAllTracksByUser = async (req,res) =>{
    try {
        let finalData = []
        let data = await TracksModel.find({userId:req?.params?.id}).populate("userId")
        for (const element of data) {
            let feedback = await FeedBackModel.find({trackId:element?._id});
            let prepareData = {track:element,feedback}
            finalData.push(prepareData)
        }
        return res.status(200).json({data:finalData,msg:"",status:200})
        return res.status(200).json({data:finalData,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getSingleTrack= async (req,res) =>{
    try {
        let data = await TracksModel.findById(req?.params?.id).populate("userId")
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const changeVisiblity= async (req,res) =>{
    try {
        let data = await TracksModel.findByIdAndUpdate(req?.params?.id,{visiblity:req.body.visiblity},{new:true})
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const likeTrack = async (req, res) => {
    try {
        let feedback = await TracksModel.findById(req.params.id);
        if (!feedback) { return res.status(404).json({ msg: "Feedback not found", status: 404 });}
        feedback.totalLikes += 1;
        await feedback.save();
        return res.status(200).json({ msg: "Track Liked", data: feedback, status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const dislikeTrack = async (req, res) => {
    try {
        let feedback = await TracksModel.findById(req.params.id);
        if (!feedback) { return res.status(404).json({ msg: "Track not found", status: 404 });}
        feedback.totalDisLikes += 1;
        await feedback.save();
        return res.status(200).json({ msg: "Track Disliked", totalDisLikes: feedback, status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const getAiSuggestionOnRap = async (req,res) =>{
    try {
        let recording = req.file
        let recordingUrl = await uploadFile(recording);
        let text = await audioToText(recordingUrl)
        let data = await aISuggestionOnRap(text)
        return res.status(200).json({data:data,msg:"Track Suggestion",status:200})

    } 
    catch (error) {
        console.log(error)
    }
}

const getAiSuggestionOnAnalytics = async (req,res) =>{
    try {
        let track = await TracksModel.find({userId:req?.params?.id})
        console.log(track)
        if(track.length<=0){
            return res.status(200).json({data:null,msg:"Please Record Some Track So, That AI Can Provide Analysis",status:200})
        }
        else{
            let audio = await audioToText(track[0]?.recording)
            console.log(audio,'audio')
            let data = await aISuggestionOnRap(audio)
            console.log(data)
            return res.status(200).json({data:data,msg:"AI Analysis",status:200})
        }

    } 
    catch (error) {
        console.log(error)
    }
}

const getAllTracksForAdmin = async (req,res) =>{
    try {
        let finalData = []
        let data = await TracksModel.find({decline:false}).populate("userId")
        for (const element of data) {
            let feedback = await FeedBackModel.find({trackId:element?._id});
            let prepareData = {track:element,feedback}
            finalData.push(prepareData)
        }
        return res.status(200).json({data:finalData,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const approveTrack = async (req,res)=>{
    try {
        let response = await TracksModel.findByIdAndUpdate(req?.params?.id,{approved:true})
        await NotificationModel.create({userId:response.userId,msg:"Track Approved By Admin"})
        return res.status(200).json({msg:"Track request accepted",status:200,data:null})
    } 
    catch (error) {
        console.log(error)
    }
}

const declineTrack = async (req,res)=>{
    try {
        let response = await TracksModel.findByIdAndUpdate(req?.params?.id,{decline:true})
        await NotificationModel.create({userId:response.userId,msg:"Track Decline By Admin"})
        return res.status(200).json({msg:"Track request decline",status:200,data:null})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {getAiSuggestionOnAnalytics,postTrack,getAllTracks,getAllTracksByUser,getSingleTrack,changeVisiblity,likeTrack,dislikeTrack,getAiSuggestionOnRap,getAllTracksForAdmin,approveTrack,declineTrack}
