const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    topic:{
        type: String,
        trim: true,
        require: true
    },
    description: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  // Reference to the user (teacher/admin) who created the test
        required: true
    },
    challenges: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'challenge'  // Reference to Challenge schema
        }
    ],
    totalPoints: {
        type: Number,  // Sum of all challenge points
        default: 0
    },
    // duration: {
    //     type: Number,  // Duration of the test in minutes
    //     default: 60
    // },
    // maxRetries: {
    //     type: Number,  // How many times the test can be retaken
    //     default: 1
    // },
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

const testModel = mongoose.model('test', testSchema);
module.exports = testModel;