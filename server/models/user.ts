import mongoose from 'mongoose';
import {Programs} from "./program";
import {course} from "./course";
import {schedule} from "./schedule";

export const userModel = mongoose.Schema({
    username: String,
    password: String,
    year: Number,
    classes_taken: [course],
    programs: [Programs],
    concentration: String,
    name: String,
    schedule: schedule
});

export function get_progress(name, callback) {
    let user_model = mongoose.model('User', userModel);
    user_model.findOne({username: name}, {}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            let user_data = data;
            let program_model = mongoose.model('Program', Programs);
            let return_data = '{ "requirements: [';
            let program_data;
            let courseCount;
            let reqComplete = true;
            program_model.findOne({ name: user_data.programs[0]}, {}, function(err, obj) {
                program_data = obj;
                for (let i = 0; i < program_data.major_courses.length; i++) {
                    if (!findArray(user_data.classes_taken, program_data.major_courses[i])) {
                        return_data += '{ "name": "Major Requirements", "Completed": false },';
                        reqComplete = false;
                        break;
                    }
                }
                if (reqComplete) {
                    return_data += '{ "name": "Major Requirements", "Completed": false },'
                }
                for (let i = 0; i < program_data.elective_courses.length; i++) {
                    courseCount = program_data.elective_courses[i].count;
                    reqComplete = true;
                    for (let j = 0; j < program_data.elective_courses[i].length; i++) {
                        if (!findArray(user_data.classes_taken, program_data.elective_courses[i])) {
                            return_data += '{ "name": "' + program_data.elective_courses[i].name + '", "Completed": false },';
                            reqComplete = false;
                            break;   
                        }
                    }
                    if (reqComplete) {
                        return_data += '{ "name": "' + program_data.elective_courses[i].name + '", "Completed": true },';
                    }
                }
            });
            return return_data;
        }
    });
}

export function findArray(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return true;
        }
    }
    return false;
}