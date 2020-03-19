import mongoose from 'mongoose';
import {course} from "./course";

export const Programs = mongoose.Schema({
    name: String,
    ismajor: Boolean,
    electivecredits: Number,
    classes_required: [
        {
            course: course
        }
    ]
});

export async function insert_program(program_details, callback) {
    let program_model = mongoose.model('Program', Programs);
    program_model.create(program_details, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}