const { MusicModel } = require("../models/music.model");
const { uploadFile } = require("../utils/function");

const uploadMusic = async (req, res) => {
    try {
        let { title, description, tags, type, creatorId, playlistId, status, duration } = req.body;
        let image = req.files.image && req.files.image;
        let audio = req.files.audio && req.files.audio;

        if (!title || !description || !tags || !type || !creatorId) {
            return res.status(400).json({ data: null, msg: "All fields are required", status: 400 });
        }

        let recordingUrl = await uploadFile(audio[0]);
        let imageUrl = await uploadFile(image[0]);
        let data
        if (playlistId && playlistId?.length > 0) {
            data = await MusicModel.create({
                title,
                description,
                tags,
                type,
                creatorId,
                playlistId,
                audio: recordingUrl,
                image: imageUrl,
                status,
                duration
            });
        }
        else {
            data = await MusicModel.create({
                title,
                description,
                tags,
                type,
                creatorId,
                audio: recordingUrl,
                image: imageUrl,
                status,
                duration
            });
        }


        return res.status(200).json({ data: data, msg: "Music/Podcast Uploaded", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const getAllMusic = async (req, res) => {
    try {
        let data = await MusicModel.find({ status: "Active" })
            .populate("creatorId")
            .populate("playlistId")
            .populate("listeners");

        return res.status(200).json({ data: data, msg: "", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const getAllByPlaylistId = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await MusicModel.find({ playlistId: id }).populate("creatorId").populate("playlistId");
        return res.status(200).json({ data: data, msg: "", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const getAllByCreatorId = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await MusicModel.find({ creatorId: id }).populate("listeners").populate("creatorId").populate("playlistId");
        return res.status(200).json({ data: data, msg: "", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const increaseDownload = async (req, res) => {
    try {
        const { id } = req.params;
        let music = await MusicModel.findById(id);
        if (!music) {
            return res.status(404).json({ data: null, msg: "Music not found", status: 404 });
        }

        music.downloaded += 1;
        await music.save();

        return res.status(200).json({ data: music, msg: "Download count increased", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const addListener = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        let music = await MusicModel.findById(id);
        if (!music) {
            return res.status(404).json({ data: null, msg: "Music not found", status: 404 });
        }

        if (!music.listeners.includes(userId)) {
            music.listeners.push(userId);
            await music.save();
        }

        return res.status(200).json({ data: music, msg: "Listener added", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.params;

        let music = await MusicModel.findById(id);
        if (!music) {
            return res.status(404).json({ data: null, msg: "Music not found", status: 404 });
        }

        music.status = status;
        await music.save();

        return res.status(200).json({ data: music, msg: "Music status changed", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const getTopMusicByListeners = async (req, res) => {
    try {
        let data = await MusicModel.find({ status: "Active" }).populate("creatorId").populate("playlistId").sort({ listeners: -1 }).limit(1);
        if (!data.length) {
            return res.status(404).json({ data: null, msg: "No music found", status: 404 });
        }

        return res.status(200).json({ data: data[0], msg: "Top music by listeners", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const updateMusic = async (req, res) => {
    try {
        let { id } = req?.params
        let { title, description, tags, type, playlistId, duration } = req.body;
        let image = req.files.image && req.files.image;
        let audio = req.files.audio && req.files.audio;

        let find = await MusicModel.findById(id)

        if (find) {
            let recordingUrl = null
            let imageUrl = null
            if (audio) {
                recordingUrl = await uploadFile(audio[0]);
            }
            if (image) {
                imageUrl = await uploadFile(image[0]);
            }

            let data
            if (find.type=="Album"||type==="Album") {
                data = await MusicModel.findByIdAndUpdate(id, {
                    title,
                    description,
                    tags,
                    type,
                    playlistId,
                    audio: recordingUrl ? recordingUrl : find?.audio,
                    image: imageUrl ? imageUrl : find?.image,
                    duration
                });
            }
            else {
                data = await MusicModel.findByIdAndUpdate(id,{
                    title,
                    description,
                    tags,
                    type,
                    audio: recordingUrl ? recordingUrl : find?.audio,
                    image: imageUrl ? imageUrl : find?.image,
                    duration,
                    playlistId:find?.playlistId
                });
            }


            return res.status(200).json({ data: data, msg: "Music/Podcast Uploaded", status: 200 });

        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

const deleteMusic = async (req, res) => {
    try {
        const { id } = req.params;
        let music = await MusicModel.findByIdAndDelete(id);
        return res.status(200).json({ data: music, msg: "Music deleted", status: 200 });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ data: null, msg: "Server error", status: 500 });
    }
};

module.exports = {deleteMusic,updateMusic, uploadMusic, getAllMusic, getAllByPlaylistId, getAllByCreatorId, increaseDownload, addListener, changeStatus, getTopMusicByListeners };
