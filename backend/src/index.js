const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const auth = require('./middleware/auth');
const authController = require('./controllers/auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', function(req, res) {
  res.send('API');
});

app.post('/signup', authController.signup);

app.post('/login', authController.login);

app.get('/me', auth, async function(req, res) {
  const { _id, email } = req.user;
  res.send({ _id, email });
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
