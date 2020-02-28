import express from 'express';
import {insert_program} from "../models/program"

const program_router = express.Router();

program_router.post('/', (req, res) => {
    console.log(req.body);
    insert_program(req.body, function(err){
        if (err) {
            res.send(err);
        } else {
            res.send("Data added successfully");
        }
    });
});

export default program_router;