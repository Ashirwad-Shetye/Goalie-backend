const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({

    user:{
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 280,
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Comment', commentSchema)