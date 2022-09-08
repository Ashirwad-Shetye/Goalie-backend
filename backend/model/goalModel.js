const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },

    text: {
        type: String,
        required: [true, 'Please provide a description']

    },

    lastDate: {
        type: Object,
        required: [true, 'Please provide a last date']
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('Goal', goalSchema);