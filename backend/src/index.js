const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', function(req, res) {
  res.send('API');
});

app.post('/signup', function(req, res) {
  res.send('Signup route');
});

app.post('/login', function(req, res) {
  res.send('Login route');
});

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
