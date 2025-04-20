const { FeedBackModel } = require("../models/feedback.model");
const { PerformanceModel } = require("../models/performance.model");


const getPerformance = async (req, res) => {
    try {
        let feedback = await FeedBackModel.find({ feedbackTo: req?.params?.id }).populate("feedbackBy").populate("feedbackTo");
        let aiAnalysis = await PerformanceModel.find({ userId: req?.params?.id });

        let feedbackWithScores = feedback.map(feedbackItem => {
            let feedbackScore = (feedbackItem.totalStars / 5) * 100;
            return { ...feedbackItem.toObject(), feedbackScore: feedbackScore };
        });

        let totalStars = feedback.reduce((sum, feedbackItem) => sum + feedbackItem.totalStars, 0);
        let avgFeedbackScore = (totalStars / (feedback?.length * 5)) * 100 || 0;
        
        let totalSmoothness = aiAnalysis.reduce((sum, analysisItem) => sum + analysisItem.smoothness, 0);
        let totalCreativity = aiAnalysis.reduce((sum, analysisItem) => sum + analysisItem.creativity, 0);
        let totalVersality = aiAnalysis.reduce((sum, analysisItem) => sum + analysisItem.versality, 0);
        
        let avgSmoothness = totalSmoothness / aiAnalysis.length || 0;
        let avgCreativity = totalCreativity / aiAnalysis.length || 0;
        let avgVersality = totalVersality / aiAnalysis.length || 0;

        let overallAvg = ((avgFeedbackScore + avgSmoothness + avgCreativity + avgVersality) / 4).toFixed(2);

        let weekAnalysis = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        };

        aiAnalysis.forEach(analysis => {
            let day = new Date(analysis.createdAt).toLocaleString('en-us', { weekday: 'long' });
            weekAnalysis[day].push(analysis);
        });

        return res.status(200).json({
            msg: null,
            data: {
                feedback: feedbackWithScores,
                aiAnalysis,
                avgFeedbackScore: avgFeedbackScore.toFixed(2) || 0,
                avgSmoothness: avgSmoothness.toFixed(2) || 0,
                avgCreativity: avgCreativity.toFixed(2) || 0,
                avgVersality: avgVersality.toFixed(2) || 0,
                overallAvg: overallAvg || 0,
                weekAnalysis
            },
            status: 200
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};


module.exports = { getPerformance };
