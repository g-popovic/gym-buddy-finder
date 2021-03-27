const router = require('express').Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const { authUser } = require('../middleware/authMiddleware');

router.post('/send', authUser, async (req, res, next) => {
	try {
		const { id, message } = req.body;

		const result = await User.updateOne(
			{
				_id: req.user.id,
				friendRequests: {
					$not: {
						$elemMatch: {
							id: id
						}
					}
				},
				friends: { $nin: id }
			},
			{ $push: { friendRequests: { id, message } } }
		);

		// Do a check if the other guy has already sent me a request or if we're friends
		if (await User.exists({ _id: id, friendRequests: { id } })) {
			res.status(403).send('The other user already sent you a friend request');
			User.updateOne({
				_id: id,
				$pull: {
					friendRequests: {
						id
					}
				}
			});
			return;
		}
		if (!result.n) return res.sendStatus(403);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

router.post('/decline', authUser, async (req, res, next) => {
	try {
		const { id } = req.body;

		const result = await User.updateOne(
			{ _id: id },
			{
				$pull: {
					friendRequests: {
						id
					}
				}
			}
		);
		if (!result.n) return res.sendStatus(404);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

router.post('/decline', authUser, async (req, res, next) => {
	try {
		const { id } = req.body;

		const result = await User.updateOne(
			{ _id: id },
			{
				$pull: {
					friendRequests: {
						id: mongoose.Types.ObjectId(id)
					}
				}
			}
		);
		if (!result.n) return res.sendStatus(404);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
