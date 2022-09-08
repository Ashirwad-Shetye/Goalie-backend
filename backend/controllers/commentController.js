const asyncHandler = require('express-async-handler');

const Comment = require('../model/commentModel');
const User = require('../model/userModel');

// @desc  Set comment
// @route POST /api/comment
// @access Private
const setComment = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please provide a text')
    }

    const comment = await Comment.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(200).json(comment)
})

module.exports ={
    setComment,
    updateComment,
    deleteComment
}