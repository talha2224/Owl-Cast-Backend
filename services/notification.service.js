const { NotificationModel } = require("../models/notification.model");

// const createNotification = async (userId, msg) => {
//     try {
//         const notification = new NotificationModel({ userId, msg });
//         await notification.save();
//         return { success: true, msg: "Notification created successfully", notification };
//     } catch (error) {
//         console.error("Error creating notification:", error);
//         return { success: false, msg: "Failed to create notification" };
//     }
// };

const getUserNotifications = async (req,res) => {
    try {
        const notifications = await NotificationModel.find({ userId:req.params.id }).sort({ createdAt: -1 });
        return res.status(200).json({ data: notifications, msg:null, status: 200 })
    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, msg: "Failed to fetch notifications" };
    }
};

const getNotificationsForAdmin = async (req,res) => {
    try {
        const notifications = await NotificationModel.find({ adminId:req.params.id }).populate("userId").sort({ createdAt: -1 });
        return res.status(200).json({ data: notifications, msg:null, status: 200 })
    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, msg: "Failed to fetch notifications" };
    }
};


const deleteNotifications = async (req,res) =>{
    try {
        const notifications = await NotificationModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ data: null, msg:"Notification Deleted", status: 200 })
    } 
    catch (error) {
        console.error("Error deleting notifications:", error);
        return { success: false, msg: "Failed to Delete notifications" };
    }
}
const deleteNotificationsForUser = async (req,res) =>{
    try {
        const notifications = await NotificationModel.findOneAndDelete({ userId:req.params.id })
        return res.status(200).json({ data: null, msg:"Notification Deleted", status: 200 })
    } 
    catch (error) {
        console.error("Error deleting notifications:", error);
        return { success: false, msg: "Failed to Delete notifications" };
    }
}

module.exports = {getUserNotifications,deleteNotifications,deleteNotificationsForUser,getNotificationsForAdmin};
