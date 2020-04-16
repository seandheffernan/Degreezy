import mongoose from 'mongoose';
import {Programs} from "./program";
import {course} from "./course";
import {semester} from "./semester";
import {get_connection} from './connection'

export const userModel = mongoose.Schema({
    rin: Number,
    usertoken: String,
    class: Number,
    classes_taken: [String],
    programs: [mongoose.Schema.Types.ObjectID],
    concentration: String,
    name: String,
    schedule: [mongoose.Schema.Types.ObjectID],
    MajorAdvisor: String,
    ClassDeanAdvisor: String,
    Degree: String,
    College: String,
    Majors: [String],
    Minor: String,
    Concentration: String,
    Level: String,
    Cohort: String,
    OverallGPA: Number
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

export function fetch_create_user(req, res) {
    let token = req.user;
    const user_model = mongoose.model("User", userModel);
    const semesterModel = mongoose.model("Semesters", semester);
    user_model.findOne({usertoken: token}, {}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            if (!data) {
                // Make Semesters
                // Assuming eight semesters
                let newUser = new user_model({usertoken: token, name: req.query.name, rin: req.query.rin, class: req.query.class});
                console.log(newUser);
                for (let i = 0; i < 10; i++) {
                    let newSemester = new semesterModel({});
                    newUser.schedule[i] = newSemester._id;
                    newSemester.save(function (err) {
                        if (err) console.log(err);
                    });
                }
                    // New User
                    newUser.save(function (err) {
                        if (err) console.log(err);
                        console.log("New User created");
                    });
                data = newUser;
            }
            let queryUser = encodeURIComponent(JSON.stringify(data));
            console.log("Logged in");
            res.redirect('/?result=' + queryUser);
        }
    })
}

export function push_semester(token, semester_id, callback) {
    let user_model = mongoose.model('User', userModel);
    //var semester = { semester: semester_id };
    user_model.findOneAndUpdate(token, {$push: {schedule: semester_id}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export function pull_semester(token, semester_id, callback) {
    let user_model = mongoose.model('User', userModel);
    //var semester = { semester: semester_id };
    user_model.findByIdAndUpdate(token, {$pull: {schedule: semester_id}}, function (err) {
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
    //var course = {course: course_name}
    user_model.findOneAndUpdate(token, {$push: {classes_taken: course_name}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(err);
        }
    });
}

export async function check_prereq(token, course_name, callback, taken=false) {
    var target = null;
    let user_model = mongoose.model('User', userModel);
    target = await user_model.findOne({usertoken: token});
    var target_sem = null;
    var target_season = null;
    var target_year = null;
    var target_course = null;
    var prereq_count = 0;
    let course_model = mongoose.model('Course', course);
    target_course = await course_model.findOne({name: course_name});
    if (target_course != null && target != null) {
        var prereqs = target_course.prerequisites;
        var target_count =  prereqs.length;
        var result = "false";
        var semester_model = mongoose.model('Semester', semester);
        if (taken) { //look through the semesters if the class is already inserted
            for (var index in target.schedule) {
                var semester_id = target.schedule[index];
                target_sem = await semester_model.findById(semester_id);
                if (target_sem){
                    target_season = target_sem.season;
                    target_year = target_sem.year;
                    break;
                }
            }
        }
        var trimesters = ["Spring","Summer","Fall"]; //to compare semester seasons
        for (var index in target.schedule) {
            var semester_id = target.schedule[index];
            target_sem = await semester_model.findById(semester_id);
            for (var i in prereqs) {
                var prereq = prereqs[i];
                if (target_sem.courses.includes(prereq)) { //see if semester has said pre reqs
                    if (taken && (target_season != null && target_year != null)){
                        if(target_year > target_sem.year) {
                            prereq_count += 1;
                            prereqs.splice(i, 1);
                            break;
                        } else if(target_year == target_sem.year && (trimesters.indexOf(target_season) > trimesters.indexOf(target_sem.season))){
                            prereq_count += 1;
                            prereqs.splice(i, 1);
                            break;
                        }
                    } else {
                        prereq_count += 1;
                        prereqs.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (prereq_count == target_count){
            result = "true";
        }
        callback(result);
    } else {
        result = "Wrong course name or faulty user token";
        callback(result);
    }
}

export async function check_coreq(token, course_name, callback, taken=false) { //Its mostly a copypaste of prereq with a slight edit
    var target = null;
    let user_model = mongoose.model('User', userModel);
    target = await user_model.findOne({usertoken: token});
    var target_sem = null;
    var target_season = null;
    var target_year = null;
    var target_course = null;
    var coreq_count = 0;
    let course_model = mongoose.model('Course', course);
    target_course = await course_model.findOne({name: course_name});
    if (target_course != null && target != null) {
        var coreqs = target_course.corequisites;
        var target_count =  coreqs.length;
        var result = "false";
        var semester_model = mongoose.model('Semester', semester);
        if (taken) { //look through the semesters if the class is already inserted
            for (var index in target.schedule) {
                var semester_id = target.schedule[index];
                target_sem = await semester_model.findById(semester_id);
                if (target_sem){
                    target_season = target_sem.season;
                    target_year = target_sem.year;
                    break;
                }
            }
        }
        var trimesters = ["Spring","Summer","Fall"]; //to compare semester seasons
        for (var index in target.schedule) {
            var semester_id = target.schedule[index];
            target_sem = await semester_model.findById(semester_id);
            for (var i in coreqs) {
                var prereq = coreqs[i];
                if (target_sem.courses.includes(prereq)) { //see if semester has said pre reqs
                    if (taken && (target_season != null && target_year != null)){
                        if(target_year > target_sem.year) {
                            coreq_count += 1;
                            coreqs.splice(i, 1);
                            break;
                        } else if(target_year == target_sem.year && (trimesters.indexOf(target_season) >= trimesters.indexOf(target_sem.season))){ // the change: > to >=
                            coreq_count += 1;
                            coreqs.splice(i, 1);
                            break;
                        }
                    } else {
                        coreq_count += 1;
                        coreqs.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (coreq_count == target_count){
            result = "true";
        }
        callback(result);
    } else {
        result = "Wrong course name or faulty user token";
        callback(result);
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