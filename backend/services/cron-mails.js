const User = require('../model/userModel')
const Goal = require('../model/goalModel')
const cron = require('node-cron')
const { REMAIND_GOAL } = require('./../configs/emailTemplates')
const EmailSendLogs = require('../model/emailSendLogs')
const { sendEmail } = require('./../services/email');

// const sendMail = async () => {
//     console.log("cron job")
//     const users =await User.find();
//     console.log(users)
// }

// cron.schedule('* * * * * *', ()=>{
//     console.log("running a task every minute")
//     sendMail();
//     console.log("pringint users")
//     console.log(users)
//     // users.forEach((user)=>{
//     //     console.log(user)
//     // })

// })
const findEmailsToSend = async (user, goal, templateType="REMAIREMAIND_GOAL") => {
    let msInHour = 1000 * 60 * 60 * 24
    let emails = await EmailSendLogs.find({user:user, template: templateType, goal:goal}).sort({'created_at': -1}).limit(1)
    if(emails.length == 0){
        sendEmail(user, REMAIND_GOAL(user.name, goal.text), goal)
    }
    else{
        console.log(emails)
        let lastSendBeforedays = (new Date() - new Date(emails[0].created_at))/msInHour;
        if((Math.floor(lastSendBeforedays) % goal.remaindInDays) == 0){
            sendEmail(user, REMAIND_GOAL(user.name, goal.text), goal)
        }
    }
    // console.log(emails)

}

const sendMail = cron.schedule('0 0 9 * * *', async () => {
    try {
      console.log('here');
      const users =await User.find();
      users.forEach(async (user) => { 
        let goals = await Goal.find({ user: user}).sort('-createdAt');
        goals.forEach(async (goal) => {
            findEmailsToSend(user, goal)
        })
        //  console.log(goals)
      });
    } catch(error) {
      console.log(err);
    }
  },{
    scheduled: false,
  });

module.exports = sendMail;