import express from 'express';
import { push_semester, pull_semester, insert_user, get_user } from '../models/user';

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

export default user_router;