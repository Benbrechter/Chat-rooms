const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = messageSchema