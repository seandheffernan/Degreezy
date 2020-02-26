import mongoose from 'mongoose';
import {get_connection} from "./connection";


export const course = mongoose.Schema({
    course_code: String,
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

course.index({"course_code": 'text', "name": 'text', "required_major": "text"});


export async function get_course(code, number, callback) {
    await get_connection().then(() => {
            let course_model = mongoose.model('Course', course);
            course_model.findOne({course_code: code, course_number: number}, {}, function (data, err) {
                callback(data, err);
                mongoose.disconnect();
            });
        }
    )
}

