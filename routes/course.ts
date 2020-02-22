import express from 'express';


const course_router = express.Router();

course_router.get('/', (req, res) => {
    res.send("Works");
});

export default course_router;
