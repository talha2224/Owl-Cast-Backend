const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true },
    music: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }], 
});

const OperatorModel = mongoose.model("Operator", operatorSchema, "Operator");

module.exports = { OperatorModel };
