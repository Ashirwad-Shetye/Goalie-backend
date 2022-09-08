const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    user:{
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 280,
    },
    img:{
        type:String,
        required: [true, 'please add an image to your post']
    },
    likes:{
        type:Array,
        default:[]
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)