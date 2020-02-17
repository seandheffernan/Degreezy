import {semester} from './semester';
import mongoose, {Schema} from 'mongoose';
const Schema = mongoose.Schema;

export const degree:Schema = new Schema({
    semesters: [
        {
            semester: semester
        }
    ]
});