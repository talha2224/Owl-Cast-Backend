const { NoteModel } = require("../models/notes.model");
const { aISuggestion } = require("../utils/function");

const createNote = async (req, res) => {
    try {
        const note = await NoteModel.create(req.body);
        return res.status(200).json({ data: note, msg: null, status: 200 });
    }
    catch (error) {
        console.error("Error creating note:", error);
        return { success: false, msg: "Failed to create note" };
    }
};
const getUserNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({ userId: req.params?.id }).sort({ createdAt: -1 });
        return res.status(200).json({ data: notes, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return { success: false, msg: "Failed to fetch notes" };
    }
};
const updateNote = async (req, res) => {
    try {
        const note = await NoteModel.findByIdAndUpdate(req.params?.id,req.body,{new:true});
        return res.status(200).json({ data: note, msg: "Note Updated", status: 200 });
    }
    catch (error) {
        console.error("Error creating note:", error);
        return { success: false, msg: "Failed to create note" };
    }
};
const getAISuggestion = async (req, res) => {
    try {
        let suggestion = await aISuggestion(req.body.note)
        return res.status(200).json({data:suggestion,status:200,msg:null})
    } catch (error) {
        console.error("Error fetching notes:", error);
        return { success: false, msg: "Failed to fetch notes" };
    }
};

const deleteNote = async (req, res) => {
    try {
        await NoteModel.findByIdAndDelete(req.params?.id);
        return res.status(200).json({ data: null, msg: "Note deleted successfully", status: 200 });
    } catch (error) {
        console.error("Error deleting note:", error);
        return { success: false, msg: "Failed to delete note" };
    }
};

module.exports = { createNote, getUserNotes, deleteNote, getAISuggestion,updateNote };
