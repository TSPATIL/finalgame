const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        questionText: [{
            type: String,
            required: true,
            trim: true,
        }],
        storyPreviousImage: {
            type: Buffer,
        },
        storyNextImage: {
            type: Buffer,
        },
        storyPrevious: {
            type: String,
            trim: true,
        },
        storyNext: {
            type: String,
            trim: true,
        },
        constraints: [
            {
                type: String,
                trim: true,
            },
        ],
        // options: {
        //     type: [String],  // Array of options if it's a multiple-choice question
        // },
        correctAnswer: [{
            type: String,
            required: true,
        }],
        timeLimit: [{
            type: Number,
            defaault: 900
            // required: true,
        }],
        points: [{
            type: Number,
            required: true,
        }],
        // type: {
        //     type: String,
        //     enum: ['multiple-choice', 'text', 'programming'],  // Different types of challenges
        //     required: true,
        // },
    },
    {
        timestamps: true,
    }
);

const challengeModel = mongoose.model("message", challengeSchema);
module.exports = challengeModel;
