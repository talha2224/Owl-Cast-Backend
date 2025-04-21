const { createTransaction, getAllTransaction } = require("../services/transaction.service")

const router = require("express").Router()

router.post("/create",createTransaction)
router.get("/all",getAllTransaction)

module.exports = router
