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
    semester: String
});

semester.index({'$**': 'text'});

export async function get_semester(semester_name, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester)
        semester_model.findOne({}, {}, function (data, err) {
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
        semester_model.findOneAndUpdate({semester: semester_name}, {$push: { courses: course}}, function(err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    });
}

export async function pull_course(semester_name, course_name, callback) { //in theory, it should remove course from semester, but needs testing
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        var course = { course: course_name };
        semester_model.findOneAndUpdate({semester: semester_name}, {$pull: { courses: course}}, function(err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    })
}