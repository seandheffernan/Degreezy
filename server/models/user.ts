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
    first_name: String,
    last_name: String,
    schedule: [{type: mongoose.Schema.Types.ObjectID, ref: "Semester"}],
    MajorAdvisor: String,
    ClassDeanAdvisor: String,
    Degree: String,
    College: String,
    Majors: [String],
    Minor: String,
    Concentration: String,
    Level: String,
    Cohort: String,
    OverallGPA: Number,
    semesterAdmitted: String,
    semesterGraduating: String
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
    const semesterModel = mongoose.model("Semester", semester);
    user_model.findOne({usertoken: token}, {})
        .populate('schedule').exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            if (!data) {
                // Make Semesters
                // Assuming semesters
                let newUser = new user_model({usertoken: token});
                // Send this version to the browser
                let newUserSend = JSON.parse(JSON.stringify(newUser));
                console.log(newUser);
                for (let i = 0; i < 10; i++) { // TODO: Tie Loop Duration to a Variable
                    let newSemester = new semesterModel({});
                    newUser.schedule[i] = newSemester._id;
                    // Adds semester objects instead of just ID
                    newUserSend.schedule[i] = JSON.parse(JSON.stringify(newSemester));
                    newSemester.save(function (err) {
                        if (err) console.log(err);
                    });
                }
                // New User
                newUser.save(function (err) {
                    if (err) console.log(err);
                    console.log("New User created");
                });
                data = newUserSend;
            }
            let queryUser = encodeURIComponent(JSON.stringify(data));
            console.log("Logged in");
            res.redirect('/?result=' + queryUser);
        }
    });
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

export async function get_progress(usertoken, callback) {
    let user_model = mongoose.model('User', userModel);
    let user_data = await user_model.findOne({usertoken: usertoken}, {});
    let program_model = mongoose.model('Program', Programs);
    let return_data = '{ "concentrations" : [';
    let program_data;
    let courseCount;
    let reqComplete = true;
    for (let programNum = 0; programNum < user_data.programs.length; programNum++) {
        program_data = await program_model.findOne({ _id : user_data.programs[programNum]}, {});
        return_data += '{"concentration" : "' + program_data.name + '",';
        return_data += '"requirements" : [';
        for (let i = 0; i < program_data.major_courses.length; i++) {
            if (!findArray(program_data.major_courses[i], user_data.classes_taken)) {
                return_data += '{ "name": "Major Requirements", "Completed": false },';
                reqComplete = false;
                break;
            }
        }
        if (reqComplete) {
            return_data += '{ "name": "Major Requirements", "Completed": true },'
        }
        for (let i = 0; i < program_data.elective_courses.length; i++) {
            courseCount = program_data.elective_courses[i].count;
            // console.log(program_data.elective_courses[i].name);
            // console.log(courseCount);
            reqComplete = true;
            let finalValue = false;
            if (i == program_data.elective_courses.length - 1) {
                finalValue = true;
            }
            for (let j = 0; j < program_data.elective_courses[i].classes.length; j++) {
                if (findArray(program_data.elective_courses[i].classes[j], user_data.classes_taken)) {
                    courseCount--;
                    // console.log(courseCount);
                    if (courseCount == 0) {
                        break;
                    }
                }
            }
            if (courseCount <= 0) {
                return_data += '{ "name": "' + program_data.elective_courses[i].name + '", "Completed": true }';
                if (!finalValue) {
                    return_data += ','
                }
                // console.log(return_data);
            } else {
                return_data += '{ "name": "' + program_data.elective_courses[i].name + '", "Completed": false }';
                if (!finalValue) {
                    return_data += ','
                }
                // console.log(return_data);
            }
        }
        return_data += ']}'
        if (programNum != user_data.programs.length - 1) {
            return_data += ',';
        }
    }
    return_data += ']}';
    callback(return_data);
}

export function findArray(value, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            // console.log(value + ' found');
            return true;
        }
    }
    // console.log(value + ' not found');
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

export async function buildCSV(token, callback) {
    const user_model = mongoose.model('User', userModel);
    const semester_model = mongoose.model("Semester", semester);
    let user = await user_model.findOne({usertoken: token});
    let csv = 'Semester, Class 1, Class 2, Class 3, Class 4, Class 5, Class 6\n';
    // console.log('hello');
    // if (user.schedule == null) {
    //     console.log('lamo');
    //     callback(csv);
    //     return;
    // }
    // console.log('ey');
    for (let i = 0; i < user.schedule.length; i++) {
        let semester = await semester_model.findOne({_id: user.schedule[i]});
        csv += i + ', ';
        for (let j = 0; j < semester.courses.length - 1; j++) {
            csv += semester.courses[j] + ', ';
        }
        csv += semester.courses[semester.courses.length - 1] + '\n';
    }
    callback(csv);
}

export async function update_user (rcsId, user_change_data, callback) {
    let user_model = mongoose.model('User', userModel);
    user_model.findOneAndUpdate({usertoken: rcsId.toUpperCase()}, user_change_data, function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    })
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
