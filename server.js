const express = require('express');

const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const expressValidator = require('express-validator');
const chalk = require('chalk');
const redis = require('socket.io-redis');
const io = require('socket.io')(http);

dotenv.load({
  path: '.env'
});

// Controllers
const appController = require('./controllers/app');
const apiController = require('./controllers/api');
const socketController = require('./controllers/socket');

// Express configs
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.set('host', process.env.NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.NODEJS_PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
app.use(express.static(`${__dirname}/public`));

// Routes
app.get('/', appController.index);
app.post('/api/download', apiController.download);
app.post('/api/download/cancel', apiController.cancelDownload);

// Socket
io.adapter(redis({
  url: process.env.REDIS_URL
}));
io.on('connect', (socket) => {
  socketController.connect(io, socket);
});

// Error Handler
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

// Start Express server
http.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
