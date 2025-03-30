const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    userId: {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    resultId: {
        ref: 'result',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    topic: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    performance: {
        type: String
    },
    improvement: {
        type: String
    },
    codeExecutionHistory: [{
        code: { type: String },
        message: { type: String },
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
        enum: ['Failed', 'Passed'],
        default: 'Failed',
        require: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    file: {
        ref: 'reportFiles',
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const reportModel = mongoose.model('report', reportSchema);
module.exports = reportModel;