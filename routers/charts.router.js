const router = require("express").Router()
const { getData } = require("../services/charts.service")

router.get("/data/:date",getData)

module.exports = router
