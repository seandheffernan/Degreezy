var mongoose = require('mongoose');
import { course } from "course"
var Schema = mongoose.Schema;

var degree = new Schema({
    courses: [course],
    semester: String
});