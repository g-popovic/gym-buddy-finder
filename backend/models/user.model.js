const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	{ _id: false }
);

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, trim: true, unique: true },
		username: { type: String, required: true, trim: true },
		password: { type: String, required: true },
		location: {
			type: pointSchema,
			index: '2dsphere'
		}
	},
	{ versionKey: false, timestamps: { updatedAt: false } }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
