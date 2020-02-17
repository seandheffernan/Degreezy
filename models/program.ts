import mongoose from 'mongoose';
import {course} from "./course";

export const Programs = mongoose.Schema({
    name: String,
    ismajor: Boolean,
    electivecredits: Number,
    classes_required: [
        {
            course: course
        }
    ]
});