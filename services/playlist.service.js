const { PlaylistModel } = require("../models/playlist.model");

const createPlaylist = async (req,res) =>{
    try {
        let {userId,title} = req.body
        let data = await PlaylistModel.create({userId,title})
        return res.status(200).json({data:data,msg:"Playlist Added",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getAllPlaylist = async (req,res) =>{
    try {
        let data = await PlaylistModel.find({userId:req?.params?.id})
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getPlaylist = async (req,res) =>{
    try {
        let data = await PlaylistModel.find({})
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createPlaylist,getAllPlaylist,getPlaylist}