const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

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
