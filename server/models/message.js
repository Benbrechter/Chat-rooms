const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    username: {
        type: String    
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = messageSchema