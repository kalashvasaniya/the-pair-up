const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgotSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        maxlength: [50, 'Email cannot be more than 50 characters']
    },
    tokenForgot: {
        type: String,
        required: [true, 'Please add a token']
    },
}, { timestamps: true });
mongoose.models = {}
module.exports = mongoose.model("Forgot", ForgotSchema);