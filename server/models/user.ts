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

