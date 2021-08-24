const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`Welcome to the backend api. Check slack for endpoint information`);
})

module.exports = router;