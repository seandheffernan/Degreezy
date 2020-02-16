import mongoose from 'mongoose';

export const userModel = mongoose.Schema({
    username: String,
    password: String,
    year: Number,
    classes_taken: [
        {
            course: String
        }
    ],
    programs: [
        {
            major: String
        }
    ],
    concentration: String,
    name: String,
    degree: String
});

