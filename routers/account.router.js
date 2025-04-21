const router = require("express").Router()
const { multipleupload } = require("../config/multer.config")
const { createAccount, loginAccount, getAccountById, resendOtp, verifyOtp, changePassword, getAllAccount, uploadPicture,deleteAccount, createCreatorAccount, loginCreatorAccount, updateSubscription } = require("../services/account.service")

router.post("/register",createAccount)
router.post("/login",loginAccount)

router.post("/creator/register",createCreatorAccount)
router.post("/creator/login",loginCreatorAccount)

router.post("/send/otp/:email",resendOtp)
router.post("/verify/otp",verifyOtp)
router.put("/change/password",changePassword)
router.put("/change/profile/:id",multipleupload.single("image"),uploadPicture)
router.delete("/:id",deleteAccount)
router.put("/subscription/:id",updateSubscription)

router.get("/single/:id",getAccountById)
router.get("/all",getAllAccount)



module.exports = router
