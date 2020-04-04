// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import {get_connection} from "./models/connection";

import course_router from './routes/course';
import semester_router from './routes/semester';
import user_router from './routes/user';
import program_router from './routes/program';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/courses', course_router);
app.use('/semesters', semester_router);
app.use('/users', user_router);
app.use('/programs', program_router);

var path = require('path');
app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '../public')));

// Server Start
const port = 3000;

app.get('/', (req, res) => res.sendFile('index.html', {root: "."}));

app.listen(port, () => {
    get_connection().then(r => console.log(`App Running on Port ${port}`))
});
