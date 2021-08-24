const router = require('express').Router();
const model = require('./model');

router.get('/', async (req, res) => {
  res.json(await model.getAllUsers())
})

router.post('/register', async (req, res) => {
  res.status(201).json(await model.insertUser(req.body))
})

module.exports = router;