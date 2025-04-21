const router = require("express").Router();
const { savePlatformSettings, getPlatformSettings } = require("../services/platformSettings.service");

router.post("/save", savePlatformSettings);

router.get("/get", getPlatformSettings);

module.exports = router;
