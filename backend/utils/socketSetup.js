const socketio = require('socket.io');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const mongoose = require('mongoose');
const session = require('express-session');
// const parseCookie = session.ge(process.env.SESSION_SECRET);

// Stores all the currently active userId's connected with their respective socketId's
let sockets = [];

// This is the main function for socket.io, takes the HTTP server as an argumentent
function setupSockets(server, memoryStore) {
	const io = socketio(server);

	io.use((socket, next) => {
		const { handshake } = socket;
		console.log(handshake);
		parseCookie(handshake, null, function (err) {
			handshake.sessionID = handshake.signedCookies['connect.sid'];
			// or if you don't have signed cookies
			handshake.sessionID = handshake.cookies['connect.sid'];

			store.get(handshake.sessionID, function (err, session) {
				if (err || !session) {
					// if we cannot grab a session, turn down the connection
					next(new Error('Session not found.'));
				} else {
					// save the session data and accept the connection
					handshake.session = session;
					next();
				}
			});
		});
		next();
	}).on('connection', async socket => {
		// Make the user appear online & emit an event signaling the user is now online,
		// & store the connection in 'sockets' variable
		sockets.push({ [socket.userId]: socket.id });
		const sender = await User.findOneAndUpdate({ _id: socket.userId }, { online: true });

		socket.on('send-message', async ({ text, recipient }) => {
			if (!mongoose.isValidObjectId(recipient)) return;
			try {
				const message = await new Message({
					from: socket.userId,
					to: recipient,
					text
				}).save();

				const recipeintSockets = sockets.filter(el => el[0] === recipient);
				// If the user is online, send them a message.
				if (recipeintSockets.length > 0) {
					// Get all the sockets of this user and the recipient
					// (using an array here because there can be more
					// than 1 socket per user if they are using multiple devices)
					const targetSocketIds = [
						...recipeintSockets.map(el => el[1]),
						...sockets.filter(el => el[0] === socket.userId).map(el => el[1])
					];

					targetSocketIds.forEach(id => io.to(id));
					io.emit('new-message', message);
				} else {
					// Otherwise fetch the users devices from the DB and send a notification
					// to each of them
					const recipientDevices = await User.findById(recipient).select('devices');

					const notificationMessage = {
						from: sender.name,
						imageUrl: sender.profilePicture,
						text: text
					};

					// Loop through devices, if device is an Android use the `sendAndroid`
					// function, if its an IPhone use the `sendIOS` function, along with the
					// required device identification and a message variable
					await Promise.all(
						recipientDevices.map(device => {
							if (device.platform === 'android') {
								return sendAndroid(device.registrationToken, notificationMessage);
							} else if (device.playform === 'ios') {
								return sendIOS(
									'This prolly needs to be some Apple device ID',
									notificationMessage
								);
							}
						})
					);

					// Find all the current users sockets and emit a `new-message` event
					const senderSocketIds = [
						...sockets.filter(el => el[0] === socket.userId).map(el => el[1])
					];
					senderSocketIds.forEach(id => io.to(id));
					io.emit('new-message', message);
				}
			} catch (err) {
				socket.emit('message-error', 'Error sending message');
			}
		});

		socket.on('message-seen', async recipient => {
			if (!mongoose.isValidObjectId(recipient)) return;

			const recipeintSockets = sockets.filter(el => el[0] === recipient);
			if (recipeintSockets.length > 0) {
				recipeintSockets.map(el => el[1]).forEach(id => io.to(id));
				io.emit('message-seen');
			}

			await Message.updateMany(
				{
					from: recipient,
					to: socket.userId,
					seen: false
				},
				{ seen: true }
			);
		});
	});
}

module.exports = setupSockets;
