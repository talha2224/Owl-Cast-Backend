const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const PaymentModel = mongoose.model("Payment", paymentSchema, "Payment");

module.exports = { PaymentModel };
