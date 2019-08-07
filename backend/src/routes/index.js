const router = require('express').Router();

const auth = require('../middleware/auth');

router.get('/', function(req, res) {
  res.send('API');
});

router.get('/me', auth, async function(req, res) {
  const { _id, email } = req.user;
  res.send({ _id, email });
});

module.exports = router;
