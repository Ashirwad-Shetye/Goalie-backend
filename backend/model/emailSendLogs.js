const mongoose = require('mongoose');

const emailSendLogsSechema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    template: {
        type: String,
        required: [true, 'Please provide a template type']
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
    }
    
}, {
    timestamps: true
})


module.exports = mongoose.model('EmailSendLogs', emailSendLogsSechema);