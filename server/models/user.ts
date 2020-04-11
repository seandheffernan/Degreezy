import mongoose from 'mongoose';
import {Programs} from "./program";
import {course} from "./course";
import {semester} from "./semester";
import {get_connection} from './connection'

export const userModel = mongoose.Schema({
    usertoken: String,
    year: Number,
    classes_taken: [{
        course: String,
    }],
    programs: [{
        program: mongoose.Schema.Types.ObjectID,
    }],
    concentration: String,
    name: String,
    schedule: [{
        semester: mongoose.Schema.Types.ObjectID,
    }]
});

export function get_user(token, callback) {
    let user_model = mongoose.model('User', userModel);
    user_model.findOne({usertoken: token}, {}, function (data, err) {
        callback(data, err);
    });
}

export function insert_user(user_details, callback) {
    let user_model = mongoose.model('User', userModel);
    user_model.create(user_details, function(err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export function push_semester(token, semester_id, callback) {
    let user_model = mongoose.model('User', userModel);
    var semester = { semester: semester_id };
    user_model.findOneAndUpdate(token, {$push: {schedule: semester}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export function pull_semester(token, semester_id, callback) {
    let user_model = mongoose.model('User', userModel);
    var semester = { semester: semester_id };
    user_model.findByIdAndUpdate(token, {$pull: {schedule: semester}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

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

export function add_course_taken(token, course_name, callback) {
    let user_model = mongoose.model('User', userModel)
    var course = {course: course_name}
    user_model.findOneAndUpdate(token, {$push: {classes_taken: course}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export function check_prereq(token, course_name, callback) {//current function looks at an arbitrary class that is not taken by the user yet.
    let user_model = mongoose.model('User', userModel)
    var target = user_model.find({_id: token})
    var target_sem = null;
    var target_course = null;
    let course_model = mongoose.model('Course', course);
    console.log("start");
    course_model.find({$text: {$search: course_name}}, function (err){
        console.log("1");
        target_course = err;
    });
    if (target_course) {
        var prereqs = target_course.prequisites;
        //grab the pre reqs
        //var result = "false";
        if (target != null) {
            var semester_model = mongoose.model('Semester', semester);
            for (var semester_id in target.schedule) { //look through the semesters the user has (or look through the classes taken)
                target_sem = semester_model.findById(semester_id);
                console.log(target_sem);
                for (var prereq in prereqs){
                    if (target_sem.courses.find(prereq)) { //see if semester has said pre reqs
                        //result = "true";
                        callback("true");
                        break;
                    }
                    else {
                    }
                }
                //if (result){break;}
            }
        }
        //callback(result);
    } else {
        callback('error');
    }
    
}
//prequisites for these courses (recursive method: dynamic programming? memo-ize?)

export function check_coreq(token, course_name, callback) { //left untouched for now
    let user_model = mongoose.model('User', userModel)
    var target = user_model.find({_id: token})
    var target_sem = null;
    var target_course = null;
    let course_model = mongoose.model('Course', course);
    target_course = course_model.find({$text: {$search: course_name}}); //find course
    var coreqs = target_course.corequisites;
    //grab the pre reqs
    var result = false;
    if (target != null) {
        var semester_model = mongoose.model('Semester', semester);
        for (var semester_id in target.schedule) { //look through the semesters the user has (or look through the classes taken)
            target_sem = semester_model.findById(semester_id);
            for (var coreq in coreqs){
                if (target_sem.courses.find(coreq)) { //see if semester has said pre reqs
                    result = true;
                    break;
                }
                else {
                }
            }
            if (result){break;}
        }
    }
    if(result) {
        callback(true);
    }
    else {
        callback(false);
    }
}

export const user_test = {
    "usertoken": "1234",
    "year": 2020,
    "classes_taken" : [],
    "programs" : [],
    "concentration" : "",
    "name" : "",
    "schedule" : []
};