const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', function(req, res) {
  res.send('API');
});

const hashPassword = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        err ? reject(err) : resolve(hash);
      });
    });
  });
};

app.post('/signup', function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Please provide an email and password' });
  }

  hashPassword(password)
    .then(function(hashedPassword) {
      res.send(
        `Signup request for user: ${email} and password: ${hashedPassword}`
      );
    })
    .catch((err) => res.sendStatus(400));
});

app.post('/login', function(req, res) {
  res.send('Login route');
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
