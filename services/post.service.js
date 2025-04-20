const { PostModel } = require("../models/post.model");

const createPost = async (req, res) => {
    try {
        const Post = new PostModel(req.body);
        await Post.save();
        return res.status(200).json({ data: Post, msg: null, status: 200 });
    }
    catch (error) {
        console.error("Error creating Post:", error);
        return { success: false, msg: "Failed to create Post" };
    }
};
const getAllPost = async (req, res) => {
    try {
        const Post = await PostModel.find({});
        return res.status(200).json({ data: Post, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching Post:", error);
        return { success: false, msg: "Failed to fetch Post" };
    }
};
const updatePost = async (req, res) => {
    try {
        const Post = await PostModel.findByIdAndUpdate(req.params?.id,{status:req.body?.status},{new:true});
        return res.status(200).json({ data: Post, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching Post:", error);
        return { success: false, msg: "Failed to fetch Post" };
    }
};
const deletePost = async (req, res) => {
    try {
        await PostModel.findByIdAndDelete(req.params?.id);
        return res.status(200).json({ data: null, msg: "Post deleted successfully", status: 200 });
    } catch (error) {
        console.error("Error deleting Post:", error);
        return { success: false, msg: "Failed to delete Post" };
    }
};

module.exports = { getAllPost, createPost, deletePost, updatePost };
