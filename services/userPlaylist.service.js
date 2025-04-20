const { UserPlaylistModel } = require("../models/userPlaylist.model");

const createPlaylist = async (req,res) =>{
    try {
        let {userId,title} = req.body
        let data = await UserPlaylistModel.create({userId,title})
        return res.status(200).json({data:data,msg:"Playlist Added",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getAllPlaylist = async (req,res) =>{
    try {
        let data = await UserPlaylistModel.find({userId:req?.params?.id}).populate("music")
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const updatePlaylist = async (req,res) =>{
    try {
        let data = await UserPlaylistModel.findByIdAndUpdate(req?.params?.id,{music:req?.body.music})
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createPlaylist,getAllPlaylist,updatePlaylist}