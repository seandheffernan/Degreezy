import {course} from './course';
import mongoose, {Schema} from 'mongoose';

const Schema = mongoose.Schema;

export const semester: Schema = new Schema({
    courses: [
        {
            course: String,
        }
    ],
    name: String,
    season: String,
    year: Number
});

semester.index({'$**': 'text'});

export async function get_semester(_id, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        semester_model.findById(_id, function (data, err) {
            callback(data, err);
            mongoose.disconnect();
        });
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

export async function push_course(_id, course_name, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        var course = { course: course_name };
        semester_model.findByIdAndUpdate(_id, {$push: {courses: course}}, function (err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    });
}

export async function pull_course(_id, course_name, callback) {
    await get_connection().then(() => {
        let semester_model = mongoose.model('Semester', semester);
        var course = { course: course_name };
        semester_model.findByIdAndUpdate(_id, {$pull: {courses: course}}, function (err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    })
}
