import {semester} from './semester';
import mongoose, {Schema} from 'mongoose';

const Schema = mongoose.Schema;

export const schedule: Schema = new Schema({
    semesters: [
        {
            semester: semester
        }
    ]
});

export function get_schedule(semester, callback) {
    let schedule_model = mongoose.model('Schedule', schedule);
    schedule_model.findOne({schedule_semester: semester}, {}, function (data, err) {
        callback(data, err);
    });
}

export function insert_schedule(schedule_details, callback) {
    let schedule_model = mongoose.model('Schedule', schedule);
    schedule_model.create(schedule_details, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}