const _ = require('lodash');
const instructorKey = process.env.INSTRUCTOR_KEY || 'iaminstructor'

const validateRegister = function (req, res, next) {

    if (_.isNil(req.body.username) || _.isNil(req.body.password)) {
        return res.status(400).send('username and password required');
    }

    if (!_.isNil(req.body.instructor_key) && req.body.instructor_key !== instructorKey)
    {
        return res.status(400).send('incorrect instructor key');
    }

    req.body.is_instructor = !_.isNil(req.body.instructor_key)

    next()
}

const validateLogin = function (req, res, next) {

    if (_.isNil(req.body.username) || _.isNil(req.body.password)) {
        return res.status(400).send('username and password required');
    }

    next()
}

module.exports.validateBody = validateRegister;
module.exports.validateLogin = validateLogin;
