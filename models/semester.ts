import course from 'course.ts';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const Degrees = new Schema({
    courses: [
        {
            course: course,
        }
    ],
    semester: String
});
