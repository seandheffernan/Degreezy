import express from 'express';
import {insert_semester, semester, get_semester} from "../models/semester"

const semester_router = express.Router();

semester_router.get('/', (req, res) => {
    get_semester(req.query.semester, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

semester_router.post('/', (req, res) => {
    console.log(req.body);
    insert_semester(req.body, function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    });
});

semester_router.post('/push', (req, res) => {
    console.log(req.body);
});

export default semester_router;