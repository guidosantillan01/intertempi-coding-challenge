const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const generateAuthToken = function(user) {
  return jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);
};

app.post('/signup', async function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'Please provide an email and password' });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
    const token = await generateAuthToken(user);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.errmsg });
  }
});

app.post('/login', async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login');

    res.send({ user });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
