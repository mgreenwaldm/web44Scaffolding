const router = require('express').Router();
const model = require('./model');
const classModel = require('../classes/model');
const authMiddleware = require('../../middleware/auth-middleware');

router.post('', authMiddleware.validateToken, async (req, res) => {

    if (! (await classModel.getClassesWithInstructorById(req.body.class_id))) {
        return res.status(400).send('class_id is invalid')
    }

    try {
        const insertedSchedule = await model.insert(req.body);
        return res.send(insertedSchedule);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get('/:id', authMiddleware.validateToken, async (req, res) => {
    res.json(await model.getMyScheduleById(req.params.id));
})

router.get('', authMiddleware.validateToken, async (req, res) => {
    res.json(await model.getMySchedule(req.body.user_id));

})
router.delete('/:id', async (req, res) => {
    await model.remove(req.params.id);
    return res.sendStatus(200);
})


module.exports = router;
