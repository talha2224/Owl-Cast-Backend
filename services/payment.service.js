const { PaymentModel } = require("../models/payment.model");



const createPayment = async (req,res) =>{
    try {
        let data = await PaymentModel.create(req.body)
        return res.status(200).json({msg:"Payment Details Stored",status:200,data})
    } 
    catch (error) {
        console.log(error)
    }
}


const getPaymentForAdmin = async (req,res) =>{
    try {
        let data = await PaymentModel.find({}).populate("userId")
        return res.status(200).json({msg:"",status:200,data})
    } 
    catch (error) {
        console.log(error)
    }
}

const getPaymentForUser = async (req,res) =>{
    try {
        let data = await PaymentModel.find({userId:req?.params?.id}).populate("userId")
        return res.status(200).json({msg:"",status:200,data})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createPayment,getPaymentForAdmin,getPaymentForUser}