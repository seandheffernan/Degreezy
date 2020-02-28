import express from 'express';
import {get_schedule, insert_schedule} from "../models/schedule";

const schedule_router = express.Router();

schedule_router.get('/', (req, res) => {
    get_schedule(req.query.semester, function(err, data){
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

schedule_router.post('/', (req, res) => {
    console.log(req.body);
    insert_schedule(req.body, function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    });
});

export default schedule_router;