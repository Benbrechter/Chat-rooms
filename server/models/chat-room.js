const mongoose = require('mongoose');
const { Schema } = mongoose;
const messageSchema = require('./message')

const ChatroomSchema= new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [messageSchema]

},
{
    toJSON: {
        virtuals: true,
    },
}
);

ChatroomSchema.virtual('userCount').get(function () {
    return this.savedUsers.length;
});

  
const Chatroom = mongoose.model('Chat-room', ChatroomSchema);

module.exports = Chatroom