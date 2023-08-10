const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        maxlength: [50, 'Email cannot be more than 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        maxlength: [50, 'Password cannot be more than 50 characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
mongoose.models = {}
module.exports = mongoose.model("User", UserSchema);