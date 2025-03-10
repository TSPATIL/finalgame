const mongoose = require('mongoose');
const { Schema } = mongoose;

const storyTestSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: String,
        trim: true,
        require: true
    },
    type: {
        type: String,
        default: "Story-based-Test",
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    challenges: [{
        title: {
            type: String,
            trim: true,
        },
        previousStory: {
            image: {
                type: Buffer,
            },
            story: {
                type: String
            }
        },
        postStory: {
            image: {
                type: Buffer,
            },
            story: {
                type: String
            }
        },
        codeExecution: {
            type: String,
            trim: true
        },
        questions: [{
            difficulty: {
                type: String,
                required: true,
                trim: true
            },
            question: {
                type: String,
                required: true,
                trim: true
            },
            answer: {
                type: String,
                required: true,
                trim: true
            },
            constraints: {
                type: String,
                trim: true
            },
            keywords: {
                type: String,
                trim: true
            },
            example: [{
                question:{
                    type: String,
                    trim: true
                },
                answer: {
                    type: String,
                    trim: true
                },
                explanation: {
                    type: String,
                    trim: true
                }
            }]
        }],
        teachings: {
            topic: {
                type: String,
                required: true,
                trim: true
            },
            explanation: {
                type: String,
                required: true,
                trim: true
            }
        }
    }],
    totalPoints: {
        type: Number,  // Sum of all challenge points
        default: 0
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    testDueDate: {
        type: Date,  // Optional due date for the test
    },
}, {
    timestamps: true,
});

const storyTestModel = mongoose.model('test', storyTestSchema);
module.exports = storyTestModel;