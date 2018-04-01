const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = Schema({
    created: Date,
    content: String,
    username: String,
    room: String
});

// create a model from the chat schema
const Chat = mongoose.model('Chat', ChatSchema);

export { Chat };