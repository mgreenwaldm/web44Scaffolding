const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

const userRouter = require('./endpoints/users/user-router');

server.use('/api/user', userRouter);

module.exports = server
