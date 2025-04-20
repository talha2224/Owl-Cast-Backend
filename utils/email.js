const nodeMailer = require("nodemailer");
const { verficationEmailTemplate } = require("./template");
require("dotenv").config()

const getSubject = (emailType) => {
    switch (emailType) {
        case "verification":
            return "Owl Cast - Account Verification ";
        default:
            return "Owl Cast - Account Verification ";
    }
};

const selectTemplate = (emailType, name, otp) => {
    switch (emailType) {
        case "verification":
            return verficationEmailTemplate(name, otp);
        default:
            return verficationEmailTemplate(name, otp);
    }
};

const sendDynamicMail = async (mailType, email, name, otp) => {
    try {
        let transporter =nodeMailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: "talhahaider074@gmail.com", pass: "usonxajefdjqbkfa", } });
        let html = selectTemplate(mailType, name, otp);
        mailOptions = { from: "<no-reply@owlcast.com>", to: email, subject: getSubject(mailType), html: html };
        await transporter.sendMail(mailOptions);
        return { status: 200, message: "Email sent successfully", };
    }
    catch (err) {
        console.log("error in sending dynamic email Functions", err)
        return { status: 500, message: err, };
    }
}

module.exports = { sendDynamicMail }