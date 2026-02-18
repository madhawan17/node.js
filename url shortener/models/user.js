const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL"
    },
    password: {
        type: String,
        required: true,
    }
},
{ timestaps: true }
);

const User = mongoose.model("user", userSchema)

module.exports = User;