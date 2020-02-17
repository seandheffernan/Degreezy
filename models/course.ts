import mongoose from 'mongoose';

export const course = mongoose.Schema({
    coursecode: Number,
    coursenumber: Number,
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
    requiredmajor: String
});