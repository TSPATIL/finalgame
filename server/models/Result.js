const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    title: {
        type: String
    },
    topic: {
        type: String
    },
    type: {
        type: String
    },
    currentChallengeNo: {
        type: Number,
        default: 0
    },
    totalActualChallenges: {
        type: Number,
        required: true
    },
    codeExecutionHistory: [{
        code: {type: String},
        output: {type: String},
        executor: {type: String, enum: ['server', 'user']}
    }],
    challengesProgress: [{
        difficulty: {
            type: String, enum: ['easy', 'medium', 'hard'],
        },
        question: {
            type: String,
        },
        answer: {
            type: String,
        },
        previousDifficulty: [{ type: String }],
        pointsEarned: { type: Number },
        startTime: { type: Date, default: Date.now },
        endTime: { type: Date },
        timeTaken: { type: Number },
        attempts: { type: Number },
        keyWords: { type: String },
        constraints: { type: String }
    }],
    status: {
        type: String,
        enum: ['In-Progress', 'Failed', 'Passed'],
        default: 'In-Progress',
        require: true
    },
    start_time: { type: Date, default: Date.now, required: true },
    end_time: {
        type: Date,
        default: function () {
            return new Date(this.start_time.getTime() + 24 * 60 * 60 * 1000);
        },
        required: true
    },
},
    {
        timestamps: true
    });

const resultModel = mongoose.model('result', resultSchema);
module.exports = resultModel;