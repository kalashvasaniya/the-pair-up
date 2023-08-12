const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
        required: [true, 'Please add a user'],
        unique: true
    },
    token2: {
        type: String,
        required: [true, 'Please add a token']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}, {});

mongoose.models = {}
module.exports = mongoose.model('Token', TokenSchema);
