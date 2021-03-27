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

module.exports = router;
