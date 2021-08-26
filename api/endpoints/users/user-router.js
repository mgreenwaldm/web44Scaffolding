const router = require('express').Router();
const middleware = require('./middleware');
const helper = require('./helper');
const model = require('./model');


router.post('/register', middleware.validateBody, async (req, res) => {
  const hashedPassword = await helper.hashPassword(req.body.password);
  try {
    const {username, user_id, is_instructor} = await model.insert({
      username: req.body.username,
      is_instructor: req.body.is_instructor,
      password: hashedPassword
    });
    return res.send({
      username,
      user_id,
      is_instructor
    });
  } catch (err) {
    if (err.message.includes('unique')) {
      return res.status(400).send('Username taken')
    }
    return res.sendStatus(400);
  }
});

router.post('/login', middleware.validateLogin, async (req, res) => {
  const dbUser = await model.getByUsername(req.body.username);

  if (!dbUser) {
    return res.status(401).send('invalid credentials');
  }

  const isPasswordValid = await helper.isPasswordValid(req.body.password, dbUser.password);

  if (!isPasswordValid) {
    return res.status(401).send('invalid credentials');
  }

  const jwt = await helper.makeJwt({
    username: dbUser.username,
    is_instructor: dbUser.is_instructor,
    user_id: dbUser.user_id
  });

  return res.send({
    message: `welcome, ${dbUser.username}`,
    token: jwt
  });
});

module.exports = router;
