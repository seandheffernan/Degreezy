import course from 'course.ts';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const degreeSchema = new Schema({
    courses: [course],
    semester: String
});

export const semester = mongoose.model('semester', degreeSchema);