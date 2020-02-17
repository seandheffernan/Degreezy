import mongoose from 'mongoose';

export const Classes = mongoose.Schema({
    coursecode: Number,
    coursenumber: Number,
    prerequisites: [
        {
            course: String
        }
    ],
    corequisites: [
        {
            course: String
        }
    ],
    name: String,
    requiredmajor: String
});