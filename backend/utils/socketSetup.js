const socketio = require('socket.io');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Stores all the currently active userId's connected with their respective socketId's
let sockets = {};

// This is the main function for socket.io, takes the HTTP server as an argumentent
function setupSockets(server, memoryStore) {
	const io = socketio(server, {
		cors: {
			origin: 'http://localhost:3000',
			methods: ['GET', 'POST'],
			transports: ['websocket', 'polling'],
			credentials: true
		}
	});

	io.use((socket, next) => {
		// NOTE: This all works except for the memoryStore retrieval, the cookie is parsed well
		/*
            const cookie = socket.handshake.headers.cookie;

            if (!cookie) {
                console.log('pls log in');
                return next(new Error('Not logged in'));
            }

            const cookieValue = decodeURIComponent(cookie.split('=')[1]);
            const decodedCookie = cookieParser.signedCookie(cookieValue, process.env.SESSION_SECRET);
            let user;

            memoryStore.get(decodedCookie, (err, data) => {
                if (err) console.error('Session retrieval error: ', err);
                user = data;
            });

            console.log({ user });

            next();
        */
		// NOTE: This is a HACK and has as much security as using a cheeto as a lock
		const userId = socket.handshake.query.id;
		if (!userId) return next(new Error('Unauthorized'));
		socket.userId = userId;
		next();
	}).on('connection', async socket => {
		// Make the user appear online & emit an event signaling the user is now online,
		// & store the connection in 'sockets' variable
		sockets[socket.userId] = socket.id;

		socket.on('send-message', async ({ message, id }) => {
			console.log({ message, id });
			if (!mongoose.isValidObjectId(id)) {
				console.log('invalid object id: ' + mongoose.isValidObjectId(id));
				return;
			}

			try {
				const newMessage = await new Message({
					from: socket.userId,
					to: id,
					message
				}).save();
				console.log('saved message');

				const recipient = sockets[id];

				console.log({ recipient, myId: socket.id });

				io.to(recipient).to(socket.id).emit('new-message', newMessage);
			} catch (err) {
				console.error(err);
				socket.emit('message-error', err);
			}
		});
	});
}

module.exports = setupSockets;
