const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    notification: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'received', 'viewed']
    },
    sendAt: {
        type: Date,
        immutable: true,
        required: true,
        default: Date.now()
    },
    viewedAt: {
        type: Date,
        immutable: true
    }
});

const notificationModel = mongoose.model('message', notificationSchema);
module.exports = notificationModel;