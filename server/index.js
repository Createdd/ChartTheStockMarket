const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const stockModel = require('./dbModel');

server.listen(process.env.PORT || 9000);

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----DATABASE
var db = mongoose.connection.openUri(
	`mongodb://${process.env.REACT_APP_MONGO_USER}:${process.env
		.REACT_APP_MONGO_PASS}@ds125774.mlab.com:25774/chartstockmarket`
);
db.on('error', err => {
	console.log('FAILED to connect to mongoose');
	console.error(err);
});
db.once('open', () => {
	console.log('connected to mongoose');
});

//----Routes
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/stocks', (req, res) => {
	stockModel.find({}, (err, polls, next) => {
		if (err) return next(err);
		return res.status(200).json(polls);
	});
});

//--------SOCKET
io.on('connection', function(socket) {
	console.log('New client connected with id:' + socket.id);
	socket.on('addStock', function(data) {
		var stockItem = new stockModel({
			stockName: data.toUpperCase()
		});
		stockItem.save((err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Added new stock ${data.toUpperCase()}!`);
			}
		});
		socket.broadcast.emit('update', 'stockItem');
	});
	socket.on('removeStock', function(data) {
		stockModel.remove({ stockName: data }, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Removed stock ${data}`);
			}
		});
		socket.broadcast.emit('removed', 'stockItem');
	});
	socket.on('disconnect', function() {
		console.log('Client disconnected');
	});
});

module.exports = server;
