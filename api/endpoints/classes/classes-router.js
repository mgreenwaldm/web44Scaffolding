const router = require('express').Router();
const model = require('./model');
const authMiddleware = require('../../middleware/auth-middleware');
const middleware = require('./middleware');

router.post('', authMiddleware.validateInstructor, middleware.validateCreateClass, async (req, res) => {
    try {
        const insertedClass = await model.insert(req.body);
        return res.send(insertedClass);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get('', authMiddleware.validateToken, async (req, res) => {
    return res.json(await model.getAllClassesWithInstructor());
});

router.get('/:id', authMiddleware.validateToken, async (req, res) => {
    res.json(await model.getClassesWithInstructorById(req.params.id))
});

router.put('/:id', authMiddleware.validateInstructor, middleware.validateCreateClass, async (req, res) => {
    try {
        const updatedClass = await model.update(req.params.id, req.body);
        return res.send(updatedClass);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

router.delete('/:id', authMiddleware.validateInstructor, async (req, res) => {
    try {
        await model.remove(req.params.id);
        return res.sendStatus(200)
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = router;
