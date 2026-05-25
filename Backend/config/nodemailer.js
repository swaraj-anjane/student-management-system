require("dotenv").config();
const nodemailer = require("nodemailer");

//create a email transporter

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth:{
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    }
});



const verifyNodemailerConnection = async()=>{
    try {
      await transporter.verify();
      console.log("Server is connected to email succesfully");
    } catch (err) {
      console.error("Verification failed:", err.message);
    }
}



const sendMail = async(recipientsEmail,subject, message , html)=>{
console.log("sendmail is are",sendMail);

try {
    await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: recipientsEmail, // list of recipients
      subject, // subject line
      text: message, // plain text body
    //   html, // HTML body
    });
console.log(`mail send successfully", ${recipientsEmail}`);


} catch (error) {
    console.log(error.message);
} }

module.exports = {verifyNodemailerConnection,sendMail}
