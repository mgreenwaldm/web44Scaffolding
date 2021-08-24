const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

const welcomeRouter = require('./endpoints/welcome/welcome-router')
const userRouter = require('./endpoints/users/user-router');

server.use('/', welcomeRouter);
server.use('/api/user', userRouter);

module.exports = server
