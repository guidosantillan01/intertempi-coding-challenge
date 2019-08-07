const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

require('./db/mongoose');
const User = require('./models/user');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', function(req, res) {
  res.send('API');
});

const hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

app.post('/signup', async function(req, res) {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'Please provide an email and password' });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send({ user, password });
  } catch (e) {
    res.status(400).send({ error: 'User was not created. Try again.' });
  }
});

app.post('/login', function(req, res) {
  res.send('Login route');
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
