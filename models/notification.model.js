const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    adminId:{type: mongoose.Schema.Types.ObjectId, ref: "Account", default:"67b95912af95b4deba592fb7" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    msg: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model("Notification", notificationSchema, "Notification");

module.exports = { NotificationModel };
