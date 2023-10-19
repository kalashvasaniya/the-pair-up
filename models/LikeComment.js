const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeComment = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    like: {
        type: Schema.Types.ObjectId,
        ref: 'Like',
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
})

mongoose.models = {}
module.exports = mongoose.model("LikeComment", LikeComment);