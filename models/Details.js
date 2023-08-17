const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailsSchema = new Schema({
    bio:{
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    LoveTo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.models = {}
module.exports = mongoose.model("Details", DetailsSchema);