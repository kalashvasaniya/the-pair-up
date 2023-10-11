const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

mongoose.models = {}
module.exports = mongoose.model("Follow", followSchema);