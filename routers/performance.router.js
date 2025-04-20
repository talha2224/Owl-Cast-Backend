const { getPerformance } = require("../services/performance.service")

const router = require("express").Router()
router.get("/user/:id",getPerformance)


module.exports = router