const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
		reciever: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
		message: { type: String, minLength: '1' }
	},
	{ timestamps: { updatedAt: false } }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
