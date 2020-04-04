import {course} from './course';
import mongoose, {Schema} from 'mongoose';

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

export function get_semester(semester_name, callback) {
    let semester_model = mongoose.model('Semester', semester);
    semester_model.findOne({name: semester_name}, {}, function (data, err) {
        callback(data, err);
    });
}

export function insert_semester(semester_details, callback) {
    let semester_model = mongoose.model('Semester', semester);
    semester_model.create(semester_details, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export function push_course(semester_name, course_name, callback) {
    let semester_model = mongoose.model('Semester', semester);
    var course = {course: course_name};
    semester_model.findOneAndUpdate({name: semester_name}, {$push: {courses: course}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export function pull_course(semester_name, course_name, callback) {
    let semester_model = mongoose.model('Semester', semester);
    var course = {course: course_name};
    semester_model.findOneAndUpdate({name: semester_name}, {$pull: {courses: course}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}
