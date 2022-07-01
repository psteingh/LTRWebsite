const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }]
})

module.exports = mongoose.model( 'user', UserSchema );