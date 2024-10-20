const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        max: 10,
        min: 10
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

const contactModel = mongoose.model('contact', contactSchema);
module.exports = contactModel;