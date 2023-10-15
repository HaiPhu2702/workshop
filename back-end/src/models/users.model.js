const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true,
        unique: true
    },
    avatar: {
        type: "String"
    }
}, { timestamps: true })

module.exports = model("Users", UserSchema)

