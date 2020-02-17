import mongoose from 'mongoose';

export const Programs = mongoose.Schema({
    name: String,
    ismajor: Boolean,
    electivecredits: Number,
    classes_required: [
        {
            course: String
        }
    ]
});