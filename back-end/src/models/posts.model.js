const { Schema, model } = require("mongoose");

const postSchema = new Schema({

    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },

    content: {
        type: String,
        required: true,
        minlength: 1,
    },

    img: {
        type: String,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },

}, { timestamps: true })

// postSchema.set('strictPopulate', false);

module.exports = model("Posts", postSchema)
