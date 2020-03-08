// Dependencies
import express from 'express';
import bodyParser from 'body-parser';

import course_router from './routes/course';
import semester_router from './routes/semester';
import schedule_router from './routes/schedule';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/courses', course_router);
app.use('/semesters', semester_router);
app.use('/schedules', schedule_router);

var path = require('path');
app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '../public')));

// Server Start
const port = 3000;

app.get('/', (req, res) => res.sendFile('index.html', {root: "."}));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
