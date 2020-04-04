import express from 'express';
import {insert_program, get_program} from "../models/program"

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

program_router.get('/', (req, res) => {
    console.log(req.query.name);
    get_program(req.query.name, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
    
});

export default program_router;