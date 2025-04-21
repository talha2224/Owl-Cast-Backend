const { AccountModel } = require("../models/account.model");
const bcrypt = require("bcryptjs")
const { generatePin, uploadFile } = require("../utils/function");
const { sendDynamicMail } = require("../utils/email");
const { TransactionModel } = require("../models/transaction.model");







const createAccount = async (req, res) => {
    try {
        let {role,firstName,lastName,email,password,aspect,dob,country} = req.body
        let findUser = await AccountModel.findOne({ email,role:"user"})
        if (findUser) {
            return res.status(400).json({ data:null, msg: "Account already exits", code: 400 })
        }
        else {
            let name = firstName + " " + lastName || "anonymous"
            let hash = await bcrypt.hash(password, 10)
            let pin = generatePin()
            await sendDynamicMail("verification", email, name, pin);

            let result = await AccountModel.create({role,firstName,lastName,email,password:hash,aspect,dob,country,otp:pin})
            return res.status(200).json({ data: result, msg: "Account Created Please Verify Your Profile", status: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const loginAccount = async (req, res) => {
    try {
        let { email, password, } = req.body
        let findUser = await AccountModel.findOne({ 
            email, 
            role: { $in: ["user", "sub admin"] } 
        });
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            let compare = await bcrypt.compare(password, findUser.password)
            if (compare) {
                return res.status(200).json({ data: findUser, msg: "Login Sucessful", code: 200 })
            }
            else {
                return res.status(403).json({ data: null, msg: "Invalid credentails", code: 403 })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

const createCreatorAccount = async (req, res) => {
    try {
        let {role,firstName,lastName,email,password,aspect,dob,country} = req.body
        let findUser = await AccountModel.findOne({ email,role:"creator"})
        if (findUser) {
            return res.status(400).json({ data:null, msg: "Account already exits", code: 400 })
        }
        else {
            let name = firstName + " " + lastName || "anonymous"
            let hash = await bcrypt.hash(password, 10)
            let pin = generatePin()
            await sendDynamicMail("verification", email, name, pin);

            let result = await AccountModel.create({role,firstName,lastName,email,password:hash,aspect,dob,country,otp:pin})
            return res.status(200).json({ data: result, msg: "Account Created Please Verify Your Profile", status: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const loginCreatorAccount = async (req, res) => {
    try {
        let { email, password, } = req.body
        let findUser = await AccountModel.findOne({email,role:"creator"})
        if (!findUser) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            let compare = await bcrypt.compare(password, findUser.password)
            if (compare) {
                return res.status(200).json({ data: findUser, msg: "Login Sucessful", code: 200 })
            }
            else {
                return res.status(403).json({ data: null, msg: "Invalid credentails", code: 403 })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

const resendOtp = async (req, res) => {
    try {
        let { email } = req.params
        let user = await AccountModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            let name = user?.username?.length > 0 ? user?.username : "anonymous"
            let pin = generatePin()
            await sendDynamicMail("verification", email, name, pin);
            await AccountModel.findByIdAndUpdate(user?._id,{ otp: pin }, { new: true })
            return res.status(200).json({ data: null, msg: "OTP send sucessfully", code: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const verifyOtp = async (req, res) => {
    try {
        let { email, otp } = req.body
        let user = await AccountModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else {
            if (otp == user?.otp) {
                await AccountModel.findByIdAndUpdate(user?._id, { otp: null, otpVerified: true }, { new: true })
                return res.status(200).json({ data: user, msg: "Otp Verified", code: 200 })
            }
            else {
                return res.status(403).json({msg: "Invalid Otp", code: 403 })
            }

        }
    }
    catch (error) {
        console.log(error)
    }
}
const changePassword = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await AccountModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ data: null, msg: "Account not exits", code: 400 })
        }
        else if (!user?.otpVerified) {
            return res.status(403).json({ data: null, msg: "Otp Not Verified You Are Unauthorized To Change Otp", code: 403 })
        }
        else {
            let hash = await bcrypt.hash(password, 10)
            await AccountModel.findByIdAndUpdate(user?._id, { password: hash, otpVerified: false }, { new: true })
            return res.status(200).json({ data: user, msg: "Password Changed", code: 200 })

        }
    }
    catch (error) {
        console.log(error)
    }
}
const getAccountById = async (req, res) => {
    try {
        let findUser = await AccountModel.findById(req.params.id)
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}
const getAllAccount = async (req, res) => {
    try {
        let findUser = await AccountModel.find()
        return res.status(200).json({ data: findUser, code: 200 })

    }
    catch (error) {
        console.log(error)
    }
}

const uploadPicture = async (req,res)=>{
    try {
        let { id } = req.params;
        let image = req.file
        let url = await uploadFile(image);
        console.log(url,'url')
        let updateProfile = await AccountModel.findByIdAndUpdate(id,{profile:url},{new:true})
        return res.status(200).json({data:updateProfile,msg:"Profile Picture Updated"})
    } 
    catch (error) {
        console.log(error)
    }
}

const updateSubscription = async (req,res)=>{
    try {
        let { id } = req.params;
        let {planName,amount} = req?.body
        let update = await AccountModel.findByIdAndUpdate(id,{isSubscribed:true,planName},{new:true})
        await TransactionModel.create({userId:id,amount})
        return res.status(200).json({data:update,msg:"Subscription Updated"})
    } 
    catch (error) {
        console.log(error)
    }
}

const deleteAccount = async (req,res)=>{
    try {
        let { id } = req.params;
        await AccountModel.findByIdAndDelete(id)
        return res.status(200).json({data:null,status:200,msg:"Account Deleted"})
    } 
    catch (error) {
        console.log(error)
    }
}


module.exports = {uploadPicture,createAccount, loginAccount,createCreatorAccount,loginCreatorAccount,getAccountById, resendOtp, verifyOtp, getAllAccount,changePassword,deleteAccount,updateSubscription}
