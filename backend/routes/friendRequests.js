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
		if (
			await User.exists({
				_id: id,
				friendRequests: {
					$elemMatch: {
						id: req.user.id
					}
				}
			})
		) {
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

router.post('/accept', authUser, async (req, res, next) => {
	try {
		const { id } = req.body;

		const session = await mongoose.startSession();
		await session.withTransaction(async () => {
			const otherGuy = await User.updateOne(
				{
					_id: id,
					friendRequests: {
						$elemMatch: {
							id: req.user.id
						}
					}
				},
				{
					$pull: {
						friendRequests: { id: req.user.id }
					},
					$addToSet: {
						friends: req.user.id
					}
				},
				{ session }
			);
			if (!otherGuy.n) {
				res.sendStatus(404);
				session.abortTransaction();
				return;
			}

			const thisGuy = await User.updateOne(
				{ _id: req.user.id },
				{ $addToSet: { friends: id } },
				{ session }
			);
			if (!thisGuy.n) {
				res.sendStatus(404);
				session.abortTransaction();
				return;
			}

			res.sendStatus(200);
			session.commitTransaction();
		});
		session.endSession();
	} catch (err) {
		next(err);
	}
});

router.post('/decline', authUser, async (req, res, next) => {
	try {
		const { id } = req.body;

		const result = await User.updateOne(
			{
				_id: id,
				friendRequests: {
					$elemMatch: {
						id: req.user.id
					}
				}
			},
			{
				$pull: {
					friendRequests: { id: req.user.id }
				}
			}
		);
		if (!result.n) return res.sendStatus(404);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

router.get('/incoming', authUser, async (req, res, next) => {
	try {
		const users = await User.find({
			friendRequests: {
				$elemMatch: {
					id: req.user.id
				}
			}
		}).select('-password');
		res.json(users);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
