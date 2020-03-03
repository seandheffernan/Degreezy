// Dependencies
import express from 'express';
import bodyParser from 'body-parser';

import course_router from './routes/course';
import semester_router from './routes/semester';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/courses', course_router);
app.use('/semesters', semester_router);


// Server Start
const port = 3000;

app.get('/', (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
