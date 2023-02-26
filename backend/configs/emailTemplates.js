const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WELCOME_EMAIL = (userName) => {
  return {
    type: "WELCOME_EMAIL",
    subject:
      "Welcome To Goalie, Now Accompolish all your tasks on your fingers!",
    body: `Hi ${userName} welcome to Goalie, using goalie you can add all your goals in the app and keep the track of all goals of yours`,
  };
};

const GOAL_ADDED = (userName, goalTitle, lastDate) => {
  return {
    type: "GOAL_ADDED",
    subject: "Congratulations! You added new goal",
    body: `Hi ${userName}, congratulations for adding your new goal. Your Goal title is ${goalTitle}, you promised to finish this goal by ${new Date(
      lastDate
    ).getDate()}-${month[new Date(lastDate).getMonth()]}-${new Date(
      lastDate
    ).getFullYear()}. We Hope you will finish this task before time and we wish you all the best for future journey of you on this jurney`,
  };
};

const REMAIND_GOAL = (userName, goalTitle) => {
  return {
    type: "REMAIND_GOAL",
    subject: "Remainder! you have a pending goal",
    body: `Hi ${userName} this mail is to remaind you that you have a pending goal to finish, title of goal is ${goalTitle}`,
  };
};

module.exports = {
  WELCOME_EMAIL,
  GOAL_ADDED,
  REMAIND_GOAL,
};
