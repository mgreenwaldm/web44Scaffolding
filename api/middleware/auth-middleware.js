const helper = require('../endpoints/users/helper');

const validateToken = async function (req, res, next) {

    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).send('token required')
    }

    try {
        const decoded = await helper.verifyJwt(authToken);
        req.body.user_id = decoded.user_id;
    } catch (err) {
        return res.status(401).send('token invalid')
    }

    next();
};

const validateInstructor = async function (req, res, next) {

    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).send('token required')
    }

    try {
        const decoded = await helper.verifyJwt(authToken);
        if (!decoded.is_instructor) {
            return res.status(401).send('must be an instructor to use this endpoint');
        }
        console.log(decoded);
        req.body.instructor_id = decoded.user_id;
    } catch (err) {
        return res.status(401).send('token invalid')
    }
    next();
};

module.exports.validateToken = validateToken;
module.exports.validateInstructor = validateInstructor;