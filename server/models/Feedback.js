const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    resultId: {
        type: Schema.Types.ObjectId,
        ref: 'result',
        required: true
    },
    feedback: {
        type: Array,
        required: true
    }
},
{
    timestamps: true,
});

const feedbackModel = mongoose.model('feedback', feedbackSchema);

module.exports = feedbackModel;