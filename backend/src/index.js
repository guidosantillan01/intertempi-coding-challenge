const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const PORT = 3000;
const app = express();

// App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(PORT, function() {
  console.log(`Listening on port: ${PORT}`);
});
