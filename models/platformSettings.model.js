const mongoose = require("mongoose");

const platformSettingsSchema = new mongoose.Schema({
    withdrawalFeePercentage: { type: Number, required: true },
    pricing: {
        student: { type: Number, required: true },
        individual: { type: Number, required: true },
        family: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now }
});

const PlatformSettingsModel = mongoose.model("PlatformSettings", platformSettingsSchema, "PlatformSettings");

module.exports = { PlatformSettingsModel };
