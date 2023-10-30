const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    chatWith: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },
    chatso: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

mongoose.models = {}
module.exports = mongoose.model("Chat", Chat);