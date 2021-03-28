const router = require('express').Router();
const User = require('../models/user.model');
const authRoutes = require('./auth');
const friendRequestRoutes = require('./friendRequests');
const mongoose = require('mongoose');
const { authUser } = require('../middleware/authMiddleware');
const Message = require('../models/message.model');

router.use('/auth', authRoutes);
router.use('/friend-request', friendRequestRoutes);

router.get('/profile-info', async (req, res, next) => {
	try {
		if (!req.session.user || !req.session.user.id) return res.json({ id: null });
		const userInfo = await User.findOne({ _id: req.session.user.id })
			.select('-password')
			.lean();
		const id = userInfo._id;
		delete userInfo._id;
		res.json({
			...userInfo,
			id
		});
	} catch (err) {
		next(err);
	}
});

router.get('/search-users', async (req, res, next) => {
	try {
		const { goal, username, maxDistance: distanceString, page = 0 } = req.query;
		const maxDistance = parseInt(distanceString, 10);

		const docsPerPage = 40;

		const locationPlaceholder = {
			type: 'Point',
			coordinates: [0.005, 0.00001]
		};

		const users = await User.aggregate([
			{
				$geoNear: {
					near: locationPlaceholder,
					maxDistance: maxDistance,
					distanceField: 'distance',
					query: {
						...(req.session.user
							? { _id: { $ne: mongoose.Types.ObjectId(req.session.user.id) } }
							: {}),
						...(goal ? { goal: { $eq: goal } } : {}),
						...(username ? { username: { $regex: username, $options: '$i' } } : {})
					}
				}
			},
			{ $skip: docsPerPage * page },
			{ $limit: docsPerPage }
		]);
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.get('/friends', authUser, async (req, res, next) => {
	try {
		const myId = mongoose.Types.ObjectId(req.user.id);

		const result = await User.aggregate([
			{
				$match: {
					friends: myId
				}
			},
			{
				$unset: ['password', 'friendRequests']
			}
		]);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get('/messages/:id', authUser, async (req, res, next) => {
	try {
		const friendId = mongoose.Types.ObjectId(req.params.id);
		const myId = mongoose.Types.ObjectId(req.user.id);

		const result = await Message.aggregate([
			{
				$match: {
					$or: [
						{ to: myId, from: friendId },
						{ to: friendId, from: myId }
					]
				}
			}
		]);

		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('There was an error');
});

module.exports = router;
