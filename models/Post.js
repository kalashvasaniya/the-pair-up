const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    like: {
        type: Number,
        default: 0,
    },
    comment: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

mongoose.models = {}
module.exports = mongoose.model("Post", PostSchema);