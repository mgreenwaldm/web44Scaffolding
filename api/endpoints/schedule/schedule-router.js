const router = require('express').Router();
const model = require('./model');

router.post('/schedule', async (req, res) => {
    res.json({
        message: 'im alive'
    })

})
router.get('/schedule/:id', async (req, res) => {
    res.json({
        message: 'im alive'
    })

})
router.get('/schedule', async (req, res) => {
    res.json({
        message: 'im alive'
    })

})
router.delete('/schedule/:id', async (req, res) => {
    res.json({
        message: 'im alive'
    })

})


module.exports = router;
