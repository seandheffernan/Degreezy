import mongoose from 'mongoose';

export const course = mongoose.Schema({
    course_code: Number,
    course_number: Number,
    prerequisites: [
        {
            course: mongoose.Schema.Types.ObjectID
        }
    ],
    corequisites: [
        {
            course: mongoose.Schema.Types.ObjectID
        }
    ],
    name: String,
    required_major: String
});
