const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

const welcomeRouter = require('./endpoints/welcome/welcome-router')
const userRouter = require('./endpoints/users/user-router');
const classesRouter = require('./endpoints/classes/classes-router');
const scheduleRouter = require('./endpoints/schedule/schedule-router');


server.use('/', welcomeRouter);
server.use('/api/user', userRouter);
server.use('/api/classes', classesRouter);
server.use('/api/schedule', scheduleRouter);

module.exports = server
