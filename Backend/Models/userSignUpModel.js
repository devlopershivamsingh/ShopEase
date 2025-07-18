

// SING-UP

const mongoose = require('mongoose');
const userSignUpSchema = new mongoose.Schema({

    uploadPic: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    role: {
        type: String,
        enum: ['general', 'admin'],
        default: 'general'
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSignUpSchema);
