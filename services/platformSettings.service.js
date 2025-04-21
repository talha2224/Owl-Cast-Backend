const { PlatformSettingsModel } = require("../models/platformSettings.model");

const savePlatformSettings = async (req, res) => {
    try {
        const existing = await PlatformSettingsModel.findOne();
        let data;
        if (existing) {
            data = await PlatformSettingsModel.findByIdAndUpdate(existing._id, req.body, { new: true });
        } 
        else {
            data = await PlatformSettingsModel.create(req.body);
        }
        return res.status(200).json({ data: data, msg: "Platform settings saved successfully.", status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong.", status: 500 });
    }
};

const getPlatformSettings = async (req, res) => {
    try {
        const data = await PlatformSettingsModel.findOne();
        return res.status(200).json({ data: data, msg: "", status: 200 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong.", status: 500 });
    }
};

module.exports = { savePlatformSettings, getPlatformSettings };
