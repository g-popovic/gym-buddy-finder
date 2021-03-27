const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true },
		location: {
			type: { String, enum: ['Point'], default: 'Point' },
			coordinates: { type: [Number], required: true }
		}
	},
	{ versionKey: false, timestamps: { updatedAt: false } }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
