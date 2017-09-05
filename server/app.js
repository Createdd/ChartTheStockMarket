const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connection.openUri((
	`mongodb://${process.env.REACT_APP_MONGO_USER}:${process.env
		.REACT_APP_MONGO_PASS}@ds125774.mlab.com:25774/chartstockmarket`
));
db.on('error', (err) => {
  console.log('FAILED to connect to mongoose');
  console.error(err);
});
db.once('open', () => {
	console.log('connected to mongoose');
});

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

io.on('connection', function(socket) {
	console.log('New client connected');
	socket.emit('stocks', { stocks: ['GOOGL', 'TSLA'] });
	socket.on('my other event', function(data) {
		console.log(data);
	});
	socket.on('disconnect', function() {
		console.log('Client disconnected');
	});
});

module.exports = server;
