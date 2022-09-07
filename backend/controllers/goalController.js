const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require('../model/userModel');
const { GOAL_ADDED } = require('./../configs/emailTemplates')
const { sendEmail } = require('./../services/email');



// @desc  Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {

    const goals = await Goal.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json(goals)
})


// @desc  Get goals
// @route GET /api/goals
// @access Private
const getGoalStats = asyncHandler(async(req, res) => {

    const pendingGoals = await Goal.find({ user: req.user.id, lastDate: {$gt: Date.parse(new Date())}});
    const finishedGoals = await Goal.find({ user: req.user.id, lastDate: {$lt: Date.parse(new Date())}});

    res.status(200).json({ pendingGoals, finishedGoals })
})

// @desc  Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please provide a text')
    }

    if(!req.body.description){
        res.status(400)
        throw new Error('Please provide a description')
    }

    if(!req.body.remaindInDays){
        res.status(400)
        throw new Error('Please provide a Days to Remainder')
    }

    if(!req.body.lastDate){
        res.status(400)
        throw new Error('Please provide a last date of goal')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
        lastDate: Date.parse(req.body.lastDate),
        description: req.body.description,
        remaindInDays: req.body.remaindInDays
    });

    sendEmail(req.user,GOAL_ADDED(req.user.name, req.body.text, req.body.lastDate))

    res.status(200).json(goal)
})

// @desc  Put goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id);

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure user logged in matches goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
         {
            new: true
        });

    res.status(200).json(updatedGoal)
})

// @desc  Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id);

    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure user logged in matches goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove();

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    getGoalStats
}