const router = require('express').Router();
const User = require('../models/user.model');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);

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
		const { goal, maxDistance, page = 0 } = req.body;

		const docsPerPage = 20;

		const locationPlaceholder = {
			type: 'Point',
			coordinates: [0.005, 0.00001]
		};

		const users = Users.aggregate([
			{
				$geoNear: {
					near: locationPlaceholder,
					maxDistance: maxDistance,
					distanceField: 'distance',
					query: {
						...(goal ? { goal: goal } : {})
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

module.exports = router;
