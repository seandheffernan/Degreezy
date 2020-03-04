import {course} from './course';
import mongoose, {Schema} from 'mongoose';
import {get_connection} from "./connection";
const Schema = mongoose.Schema;

export const semester: Schema = new Schema({
    courses: [
        {
            course: String,
        }
    ],
    name: String
});

semester.index({'$**': 'text'});

export async function get_semester(searchString, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester)
        semester_model.findOne({name: searchString}, {}, function (data, err) {
            callback(data, err);
            mongoose.disconnect();
        });
    });
}

export async function insert_semester(semester_details, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        semester_model.create(semester_details, function(err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    });
}

export async function push_course(semester_name, course_name, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        var course = { course: course_name };
        semester_model.findOneAndUpdate({name: semester_name}, {$push: {courses: course}}, function(err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    });
}

export async function pull_course(semester_name, course_name, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        var course = { course: course_name };
        semester_model.findOneAndUpdate({name: semester_name}, {$pull: {courses: course}}, function(err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    })
}