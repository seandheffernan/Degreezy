import {course} from './course';
import mongoose, {Schema} from 'mongoose';
const Schema = mongoose.Schema;

export const semester: Schema = new Schema({
    courses: [
        {
            course: String,
        }
    ],
    semester: String
});
