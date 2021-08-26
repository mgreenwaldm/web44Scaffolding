const _ = require("lodash");

const validateCreateClass = function (req, res, next) {

    if (_.isNil(req.body.name)) {
        return res.status(400).send('name is required');
    }

    if (_.isNil(req.body.start_time) ) {
        return res.status(400).send('start time is required');
    }

    if (_.isNil(req.body.location)) {
        return res.status(400).send('location is required');
    }

    if (_.isNil(req.body.intensity_level)) {
        return res.status(400).send('intensity_level is required');
    }

    if (_.isNil(req.body.max_attendees)) {
        return res.status(400).send('max_attendees is required');
    }

    next()
}


module.exports.validateCreateClass = validateCreateClass;