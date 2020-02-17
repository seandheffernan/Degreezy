import semester from 'semester.ts';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Semester = require('semester.ts');

export const degree = new Schema({
    semesters: [
        {
            semester: semester
        }
    ]
});