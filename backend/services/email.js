
const EmailSendLogs = require('../model/emailSendLogs')


const nodemailer = require('nodemailer');
      let transporter = nodemailer.createTransport({
            service: 'Gmail',
             auth: {
                 user: process.env.EMAIL_ID,
                 pass: process.env.EMAIL_PASSWORD
             }
     })


const sendEmail = async (message,receiverMail) =>{
    let messageData = {
            from: process.env.EMAIL_ID,
            to: receiverMail,
            subject: message.subject,
            text: message.body
    }
    transporter.sendMail(messageData,(err,info) => {
        if(err){
            console.log(err)
        }
        else{

            EmailSendLogs.create({
                user,
                template: message.type,
                goal
            })

            console.log(info)
        }
    })
}

module.exports = {
    sendEmail
}
