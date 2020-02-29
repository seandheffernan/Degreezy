import {semester} from './semester';
import mongoose, {Schema} from 'mongoose';
import {get_connection} from './connection'
const Schema = mongoose.Schema;

export const schedule:Schema = new Schema({
    semesters: [
        {
            semester: semester
        }
    ]
});

export async function get_schedule(semester, callback) {
    await get_connection().then(() => {
            let schedule_model = mongoose.model('Schedule', schedule);
            schedule_model.findOne({}, {}, function (data, err) {
                callback(data, err);
                mongoose.disconnect();
            });
        }
    )
}

export async function insert_schedule(schedule_details, callback) {
    await get_connection().then(() => {
        let schedule_model = mongoose.model('Schedule', schedule);
        schedule_model.create(schedule_details, function(err) {
            if (err) {
                console.log(err);
            } else {
                callback(err);
            }
            mongoose.disconnect();
        });
    });
}