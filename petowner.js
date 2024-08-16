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
    pet: {
        type: String,
    },
    petnumber: {
        type: Number,
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
    messages:{
        type: Array,
        default : [],
    },
    date: {
        type: Date,
    },
});
const User2 = mongoose.model('PetOwner', UserSchema);
User2.createIndexes();

module.exports = User2;

