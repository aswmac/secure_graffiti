// This file runs from 'node server.js' on the
// command line

const express = require('express');
const https = require('https');
const http = require('http');
const { readFileSync, writeFileSync } = require('fs');

const app = express();
//const server = http.createServer(app);
//const io = require('socket.io')(server);

// Read SSL certificate and key from the file system
const options = {
		cert: readFileSync('/etc/letsencrypt/live/aswmac.com/fullchain.pem'),
		key: readFileSync('/etc/letsencrypt/live/aswmac.com/privkey.pem')
};

// Create an HTTPS server instance with SSL options to be started later
const httpsServer = https.createServer(options, app);
const io = require('socket.io')(httpsServer);

// Persistent text storage
let textContent = '';
let isEditing = false;

try {
	// Load existing content from file
	textContent = readFileSync('text.txt', 'utf8');
} catch (err) {
	writeFileSync('text.txt', '');
}

// Define some communication protocols
io.on('connection', (socket) => {
  const connectTime = new Date().toISOString();
	console.log(connectTime, ': A user connected');
  const ipAddress = socket.request.socket.remoteAddress || socket.handshake.address;

  console.log('                   from ${ipAddress}');
	// Send initial state to the new user
	socket.emit('init', { text: textContent, isEditing });

	socket.on('add_text', (newText) => {
		if (!isEditing) {
			isEditing = true;
			io.emit('start_editing'); // Notify all clients that editing has started

			textContent += '\n' + newText.trim(); // Append new line
			writeFileSync('text.txt', textContent); // Save to file

			io.emit('update_text', textContent);
			isEditing = false;
			io.emit('end_editing'); // Notify all clients that editing has ended
		} else {
			socket.emit('error', 'Another user is currently adding text. Please try again later.');
		}
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// Start the HTTPS server on port 443
httpsServer.listen(443, () => {
		console.log('HTTPS Server running on port 443');
});

// Create an HTTP server that redirects all requests to HTTPS
const httpServer = http.createServer((req, res) => {
		res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
		res.end();
});

httpsServer.on('clientError', (err, socket) => {
  console.error(err);

  // Ensure the socket is destroyed to avoid further errors
  if (socket.writable) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  } else {
    socket.destroy();
  }
});


// Start the HTTP server on port 80
httpServer.listen(80, () => {
		console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});
//server.listen(3000, () => {
//	console.log('Server running on http://localhost:3000');
//});
