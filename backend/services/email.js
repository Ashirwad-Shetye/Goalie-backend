const nodemailer = require('nodemailer');
      let transporter = nodemailer.createTransport({
            service: 'Gmail',
             auth: {
                 user: process.env.EMAIL_ID,
                 pass: process.env.EMAIL_PASSWORD
             }
     })


const sendEmail = async (message,receiverMail) =>{
    console.log({
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    })
    let messageData = {
            from: process.env.EMAIL_ID,
            to: receiverMail,
            subject: message.subject,
            text: message.body
    }
    console.log(messageData)
    transporter.sendMail(messageData,(err,info) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}

module.exports = {
    sendEmail
}