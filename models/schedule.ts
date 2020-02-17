import {semester} from './semester';
import mongoose, {Schema} from 'mongoose';
const Schema = mongoose.Schema;

export const schedule:Schema = new Schema({
    semesters: [
        {
            semester: semester
        }
    ]
});