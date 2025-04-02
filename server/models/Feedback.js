const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: true
    },
},
{
    timestamps: true,
});

const feedbackModel = mongoose.model('feedback', feedbackSchema);

module.exports = feedbackModel;