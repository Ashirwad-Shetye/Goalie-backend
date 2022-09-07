const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const { sendEmail } = require('./../services/email');
const { WELCOME_EMAIL } = require('./../configs/emailTemplates')

// @desc  Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    // all fields are required
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields');
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    sendEmail(WELCOME_EMAIL(name),email)


    if(user) {

        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid user data received')
    }
})

// @desc  Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    const LoggedInUser = await User.findById(req.user.id);
    // check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    await user.remove();

    res.status(200).json({ id: req.params.id})
})




// @desc  Authenticate user
// @route POST /api/users
// @access Public
const LoginUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    //check for user email
    const user = await User.findOne({ email: email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({message: 'Login user'})
})

// @desc  Get user data
// @route POST /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// @desc  Get user data
// @route POST /api/users/me
// @access Private
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const {_id, name, email} = user;

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// @desc  Get user data
// @route POST /api/users/me
// @access Private
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find();
    console.log(users)
    res.status(200).json(users)
})


// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { 
    registerUser,
    LoginUser,
    getMe,
    deleteUser,
    getAllUsers,
    getUserById
}