import mongoose from 'mongoose';
import {course} from "./models/course";

mongoose.connect("mongodb+srv://test:kuzmin@cluster0-djdw5.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const CourseModel = new mongoose.model('Classes', course);
var doc = CourseModel();
doc.coursecode = "CSCI-1111";
doc.coursenumber = 11111;
doc.prerequisites = null;
doc.corequisites = null;
doc.name = "test";
doc.majorRestricted = false;
doc.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.name + " saved to Class collection.");
});