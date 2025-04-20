const { createPayment, getPaymentForAdmin, getPaymentForUser } = require("../services/payment.service")

const router = require("express").Router()

router.post("/create",createPayment)
router.get("/admin/all",getPaymentForAdmin)
router.get("/user/:id",getPaymentForUser)

module.exports = router
