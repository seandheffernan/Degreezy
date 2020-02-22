import mongoose from 'mongoose';

export const course = mongoose.Schema({
    coursecode: String,
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
    majorRestricted: Boolean
}, {collection: 'Classes'});