var mongoose = require('mongoose');
import {Semester} from "semester";
var Schema = mongoose.Schema;

var degree = new Schema({
    semesters: [Semester]
});