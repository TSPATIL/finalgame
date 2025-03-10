const mongoose = require('mongoose');
const {Schema} = mongoose;

const resultSchema = new Schema({
    userId: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    testId: {
        ref: 'test',
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    currentChallenge: {
        type: Number,
        default: 0
    },
    challengesProgress: [{
        difficulty: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false,
            required: true
        },
        pointsEarned: { type: Number },
        timeTaken: { type: Number },
        attempts: { type: Number },
        keyWords: [{
            type: String,
            trim: true
        }]
    }],
    status: {
        type: String,
        enum: ['In-Progress', 'Failed', 'Passed'],
        default: 'In-Progress',
        require: true
    },
    totalPointsEarned: {
        type: Number,
        default: 0
    },
    totalTimeTaken: {
        type: Number,
        default: 0
    }
},
{ 
    timestamps: true 
});

const resultModel = mongoose.model('result', resultSchema);
module.exports = resultModel;