const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userType: {
        type: String,
        required: true,
        enum: ['student', 'teacher', 'admin']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firebaseId: {
        type: String,
        require: true
    },
    profile: {
        firstName: { type: String, minLength: 3, trim: true },
        middleName: { type: String, trim: true },
        lastName: { type: String, minLength: 3, trim: true },
        gender: { type: String, default: 'male', enum: ['male', 'female', 'other'] },
        contact: {
            phone: { type: String, trim: true, minLength: 10, maxLength: 10 },
            portfolio: [{ type: String, trim: true }],
            links: [{
                name: { type: String, trim: true },
                address: { type: String, trim: true }
            }]
        },
        dateOfBirth: { type: Date },
        image: { type: Buffer },
        bio: { type: String, trim: true },
        avatar: { type: String, default: '' },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            country: { type: String, trim: true },
            zip: { type: String, trim: true }
        },
        skills: [{ type: String }],
        // experience: [{
        //     position: { ttpe: String },
        //     companyName: { type: String },
        //     type: { type: String, trim: true, enum: ['internship', 'job']},
        //     description: { type: String }
        // }],
        education: [{
            degree: { type: String },
            institute: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            status: { type: String, enum: ['pursuing', 'completed'] }
        }],
        // acheivements: [{
        //     name: { type: String },
        //     date: { type: String },
        //     description: { type: String }
        // }],
        // projects: [{
        //     name: { type: String },
        //     skills: [{ type: String }],
        //     description: { type: String }
        // }]
    },
    refreshToken: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;