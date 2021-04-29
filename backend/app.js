const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const cron = require('node-cron');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { cleanupAllTasks } = require('./controllers/sandbox');

const app = express();

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(routes);

cron.schedule(`*/${config.sandboxTTLSeconds / 2} * * * * *`, cleanupAllTasks);

app.use(errorHandler);

module.exports = app;
