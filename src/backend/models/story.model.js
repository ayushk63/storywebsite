import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/StoryProject");

const storySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unqiue: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
        unique: true
    },
    numLikes: {
        type: Number
    },
    numComments: {
        type: Number
    },
    comments: {
        type: Array
    }
});

export const Story = mongoose.model("Story", storySchema);