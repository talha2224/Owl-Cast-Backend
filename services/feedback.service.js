const { NotificationModel } = require("../models/notification.model")
const { FeedBackModel } = require("../models/feedback.model")

const createFeedback = async (req, res) => {
    try {
        let result = await FeedBackModel.create(req.body)
        await NotificationModel.create({userId:req.body.feedbackTo,msg:"Feedback given by user"})
        return res.status(200).json({ data: result, msg: "Thanks For Feedback", status: 200 })
    }
    catch (error) {
        console.log(error)
    }
}

const getAllFeedBack = async (req, res) => {
    try {
        let feedbacks = await FeedBackModel.find({ feedbackTo: req.params?.id }).populate("feedbackBy");

        if (feedbacks.length === 0) {
            return res.status(200).json({ data: [], avgScore: 0, msg: "No Feedback Found", status: 200 });
        }

        let totalStars = feedbacks.reduce((sum, feedback) => sum + feedback.totalStars, 0);
        let avgScore = (totalStars / (feedbacks.length * 5)) * 100;
        return res.status(200).json({ data: feedbacks, avgScore: avgScore.toFixed(2) + "%", msg: "Thanks For Feedback", status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const likeFeedback = async (req, res) => {
    try {
        let feedback = await FeedBackModel.findById(req.params.id);
        if (!feedback) { return res.status(404).json({ msg: "Feedback not found", status: 404 });}
        feedback.totalLikes += 1;
        await feedback.save();
        return res.status(200).json({ msg: "Feedback Liked", data: feedback, status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const dislikeFeedback = async (req, res) => {
    try {
        let feedback = await FeedBackModel.findById(req.params.id);
        if (!feedback) { return res.status(404).json({ msg: "Feedback not found", status: 404 });}
        feedback.totalDisLikes += 1;
        await feedback.save();
        return res.status(200).json({ msg: "Feedback Disliked", totalDisLikes: feedback, status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const getTopRatedUsers = async (req, res) => {
    try {
        let topUsers = await FeedBackModel.aggregate([
            {$group: {_id: "$feedbackTo",totalStars: { $sum: "$totalStars" },feedbackCount: { $sum: 1 },avgStars: { $avg: "$totalStars" }}},{ $sort: { avgStars: -1 } },{ $limit: 10 },
            {$lookup: {from: "Account",localField: "_id",foreignField: "_id",as: "user"}},{ $unwind: "$user" },
            {$project: {_id: 0,userId: "$user._id",name: "$user.username",email: "$user.email",profile:"$user.profile",totalStars: 1,feedbackCount: 1,avgStars: { $round: ["$avgStars", 2] }}}
        ]);

        return res.status(200).json({ data: topUsers, status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

const getFeedbackGroupedByTrack = async (req, res) => {
    try {
        let trackFeedbacks = await FeedBackModel.aggregate([
            {$group: {_id: "$trackId",feedbacks: { $push: "$$ROOT" },totalStars: { $sum: "$totalStars" },feedbackCount: { $sum: 1 },avgStars: { $avg: "$totalStars" }}},
            { $sort: { avgStars: -1 } },
            {$lookup: {from: "Tracks",localField: "_id",foreignField: "_id",as: "track"}},
            { $unwind: "$track" },
            {$project: {_id: 0,trackId: "$track._id",trackName: "$track.name",trackDetails: "$track",totalStars: 1,feedbackCount: 1,avgStars: { $round: ["$avgStars", 2] },feedbacks: 1}}
        ]);

        return res.status(200).json({ data: trackFeedbacks, status: 200 });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};




module.exports = {createFeedback,getAllFeedBack,likeFeedback,dislikeFeedback,getTopRatedUsers,getFeedbackGroupedByTrack}
