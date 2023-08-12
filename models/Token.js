const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: [true, 'Please add a token']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}, { timestamps: true });

mongoose.models = {}
module.exports = mongoose.model('Token', TokenSchema);
