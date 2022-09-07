const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const WELCOME_EMAIL = (userName) => {
    return({
    subject: "Welcome To Goalie, Now Accompolish all your tasks on your finges!",
    body: `Hi ${userName} welcome to Goalie, using goalie you can add all your goals in the app and keep the track of all goals of yours`
})
}

const GOAL_ADDED = (userName, goalTitle, lastDate) => {
    return({
        subject: "Congratulations! You added new goal",
        body:   `Hi ${userName}, congratulations for adding your new goal. Your Goal title is ${goalTitle}, you promised to finish this goal by ${new Date(lastDate).getDate()}-${month[new Date(lastDate).getMonth()]}-${new Date(lastDate).getFullYear()}. We Hope you will finish this task before time and we wish you all the best for future journey of you on this jurney`
    })
}

module.exports = {
    WELCOME_EMAIL,
    GOAL_ADDED
}