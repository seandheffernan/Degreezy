import mongoose from 'mongoose';
import {Programs} from "./program";
import {course} from "./course";
import {semester} from "./semester";

export const userSchema = mongoose.Schema({
    username: String,
    password: String,
    rcsID: String,
    year: Number,
    classes_taken: [course],
    programs: [Programs],
    concentration: String,
    name: String,
    schedule: [
        {
            semester: mongoose.Schema.Types.ObjectID
        }
    ]
});

export function fetch_create_user(req, res) {
    let rcsid = req.user;
    const userModel = mongoose.model("Users", userSchema);
    const semesterModel = mongoose.model("Semesters", semester);
    userModel.findOne({rcsID: rcsid}, {}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (!data) {
                // Make Semesters
                // Assuming eight semesters
                let newUser = new userModel({rcsid: rcsid});
                for (let i = 0; i < 8; i++) {
                    let newSemester = new semesterModel({name: ''}); // TODO: Add Name Parameter According to Spec
                    newUser.schedule[i] = newSemester._id;
                    newSemester.save(function(err) {
                        if(err) console.log(err);
                    });
                }
                // New User
                newUser.save(function(err) {
                    if(err) console.log(err);
                });
            } else {
                callback(null, data)
            }
        }
    })
}

