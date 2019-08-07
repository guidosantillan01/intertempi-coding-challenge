const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

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
  const userId = uuidv4();

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Please provide an email and password' });
  }

  const createUser = function(id, email, hashedPassword) {
    res.status(201).send(`User with id: ${id} created!`);
  };

  hashPassword(password)
    .then(function(hashedPassword) {
      createUser(userId, email, hashedPassword);
    })
    .catch((err) => res.status(400).send(err));
});

app.post('/login', function(req, res) {
  res.send('Login route');
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
