const { OperatorModel } = require("../models/operator.model");

const createOperator = async (req,res) =>{
    try {
        let data = await OperatorModel.create(req.body)
        return res.status(200).json({data:data,msg:"Operator Added",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const updateOperator = async (req,res) =>{
    try {
        let data = await OperatorModel.findByIdAndUpdate(req?.params?.id,req.body)
        return res.status(200).json({data:data,msg:"Operator Updated",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

const getAllOperator = async (req,res) =>{
    try {
        let data = await OperatorModel.find({}).populate("music")
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}
const getSingle = async (req,res) =>{
    try {
        let data = await OperatorModel.findById(req?.params?.id).populate({path: "music",populate: {path: "creatorId",model: "Account"}});
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}


const deleteOperator = async (req,res) =>{
    try {
        let data = await OperatorModel.findByIdAndDelete(req?.params?.id)
        return res.status(200).json({data:data,msg:"",status:200})
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {createOperator,getAllOperator,deleteOperator,updateOperator,getSingle}