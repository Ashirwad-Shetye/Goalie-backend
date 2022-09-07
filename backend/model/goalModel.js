const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type: String,
        required: [true, 'Please provide a text']

    },

    lastDate: {
        type: Object,
        required: [true, 'Please provide a last date']
    },

    description: {
        type: String,
        required: [true, 'Please provide a description']
    },

    remaindInDays: {
        type: Number,
        required: [true, 'Please provide number of days to Remaind a goal']
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('Goal', goalSchema);