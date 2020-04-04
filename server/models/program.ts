import mongoose from 'mongoose';

export const Programs = mongoose.Schema({
    name: String,
    major_courses: [
        String
    ],
    elective_courses: [
        {
            name: String,
            count: Number,
            classes: [
                String
            ]
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

export async function get_program(program_name, callback) {
    let program_model = mongoose.model('Program', Programs);
    program_model.findOne({name: program_name}, function(err, data) {
        console.log(data);
        callback(data, err);
    });
}