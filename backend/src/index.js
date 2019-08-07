const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', function(req, res) {
  res.send('API');
});

app.post('/signup', function(req, res) {
  const { email, password } = req.body;

  res.send(`Signup request for user: ${email}`);
});

app.post('/login', function(req, res) {
  res.send('Login route');
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
