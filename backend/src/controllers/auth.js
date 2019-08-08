const bcrypt = require('bcrypt');

const User = require('../models/user');
const { hashPassword, generateAuthToken } = require('../helpers');

const signup = async function(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(422).send({ error: 'Please provide an email and password' });
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ email, password: hashedPassword, username });

  try {
    await user.save();
    const token = await generateAuthToken(user);
    res.status(201).send({ token });
  } catch (e) {
    res.status(400).send({ error: e.errmsg });
  }
};

const login = async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login');

    const token = await generateAuthToken(user);
    res.send({ token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  signup,
  login
};
