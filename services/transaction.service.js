const { TransactionModel } = require("../models/transaction.model");

const createTransaction = async (req,res) =>{
    try {
        let data = await TransactionModel.create(req.body)
        return res.status(200).json({data:data,msg:"Transaction Added",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getAllTransaction = async (req,res) =>{
    try {
        let data = await TransactionModel.find()
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createTransaction,getAllTransaction}