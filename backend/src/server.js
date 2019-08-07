const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

// App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.use('/', indexRouter);
app.use('/', authRouter);

module.exports = app;
