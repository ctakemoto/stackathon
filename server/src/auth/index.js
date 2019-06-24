const router = require('express').Router();
const db = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await db.models.user.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await db.models.user.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      name: req.body.name,
    });
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      let message = err.fields.email
        ? 'User already exists'
        : 'Username already in use';
      res.status(401).send(message);
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  if (!req.user) {
    res.json(null);
  } else {
    res.json({
      email: req.user.email,
      username: req.user.username,
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      billingAddress: req.user.billingAddress,
      shippingAddress: req.user.shippingAddress,
    });
  }
});

// router.use('/google', require('./google'))
