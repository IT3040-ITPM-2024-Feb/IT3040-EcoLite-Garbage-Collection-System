const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['seller','admin','company'], default: 'seller' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;