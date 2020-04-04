import express from 'express';
import { push_semester, pull_semester, insert_user, get_user, add_course_taken, check_prereq, check_coreq } from '../models/user';

const user_router = express.Router();

user_router.get('/', (req, res) => {
    get_user(req.query.token, function(err, data){
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

user_router.post('/', (req, res) => {
    console.log(req.body);
    insert_user(req.body, function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    });
});

user_router.put('/push', (req, res) => {
    console.log(req.body);
    push_semester(req.body.token, req.body.semester_id, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    });
});

user_router.post('/pull', (req, res) => {
    console.log(req.body);
    pull_semester(req.body.token, req.body.semester_id, function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Data removed successfully");
        }
    });
});

user_router.put('/courses/push', (req, res) => {
    add_course_taken(req.body.token, req.body.course_name, function(err){
        if(err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    })
})

user_router.get('/courses/prereq', (req, res) =>{
    check_prereq(req.query.token, req.query.course_name, function(result){
        if(result) {
            res.send("The user has met the prerequisites for the course");
        } else {
            res.send("The user has not met the prerequisites for the course");
        }
    })
})

user_router.get('/courses/coreq', (req, res) =>{
    check_coreq(req.query.token, req.query.course_name, function(result){
        if(result) {
            res.send("The user has met the corequisites for the course");
        } else {
            res.send("The user has not met the corequisites for the course");
        }
    })
})
export default user_router;