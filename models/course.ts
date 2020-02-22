import mongoose from 'mongoose';
import {get_connection} from "./connection";


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


export function get_course(code, number) {
    let course_model = mongoose.model('Course', course);
    course_model.findOne({course_code: code, course_number: number}, function(err, data) {
        return data;
    });
}
