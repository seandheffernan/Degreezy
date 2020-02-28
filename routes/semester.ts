import express from 'express';
import {insert_semester, semester} from "../models/semester"

const semester_router = express.Router();

semester_router.post('/', (req, res) => {
    console.log(req.body);
    insert_semester(req.body, function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    });
})

export default semester_router;