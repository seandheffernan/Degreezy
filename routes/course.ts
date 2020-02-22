import express from 'express';
import {get_course} from "../models/course";


const course_router = express.Router();

course_router.get('/', (req, res) => {
    get_course(req.query.course_code, req.query.course_number)
});

export default course_router;
