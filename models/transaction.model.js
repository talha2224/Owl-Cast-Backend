const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    type:{type:String,default:"Subscription"}, 
    createdAt: { type: Date, default: Date.now },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema, "Transaction");

module.exports = { TransactionModel };
