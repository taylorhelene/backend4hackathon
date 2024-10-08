// To connect with your mongoDB database
const mongoose = require('mongoose');
// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    hbaraccount:
    {
        type: String,
        required : true,
    },
    location:
    {
        type: String,
    },
    stars:
    {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    messages:{
        type: Array,
        default : [],
    },
});
const User = mongoose.model('Carer', UserSchema);
User.createIndexes();

module.exports = User;

