const { createRhymes, getRhymes, updateRhymes } = require("../services/rhymes.service")

const router = require("express").Router()

router.post("/create",createRhymes)
router.put("/update/:id",updateRhymes)
router.get("/user/:id",getRhymes)

module.exports = router