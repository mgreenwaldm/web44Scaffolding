const _ = require("lodash");

const validateAddClass = function (req, res, next) {
    if (_.isNil(req.body.class_id)) {
        return res.status(400).send('class_id is required');
    }
    next()
}


module.exports.validateAddClass = validateAddClass;