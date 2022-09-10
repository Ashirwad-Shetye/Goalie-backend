const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: String,
        required: true,
        ref: 'User'
    },
    desc: {
        type: String,
        max: 280,
    },
    post: {
        type: Schema.ObjectId,
        ref: 'Post'
      }

},{
    timestamps: true,
})

module.exports = mongoose.model('Comment', commentSchema)