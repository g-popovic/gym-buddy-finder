const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { authUser } = require('../middleware/authMiddleware');

router.post('/register', async (req, res, next) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const data = req.body;
		const newUser = new User(data);
		await newUser.save();
		req.session.user = { id: newUser._id };

		newUser.id = user._id;
		delete newUser.password;
		delete newUser._id;
		res.json(newUser);
	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { password, email } = req.body;

		const user = await User.findOne({ email }).lean();
		if (!user) return res.status(401).send('Incorrect email');
		if (!(await bcrypt.compare(password, user.password)))
			return res.status(401).send('Incorrect password');

		req.session.user = { id: user._id };

		user.id = user._id;
		delete user.password;
		delete user._id;
		res.json(user);
	} catch (err) {
		next(err);
	}
});

router.get('/status', async (req, res, next) => {
	try {
		const user = req.session.user ? await User.findById(req.session.user.id).lean() : null;
		if (user) {
			user.id = user._id;
			delete user.password;
			delete user._id;
		}
		res.json(user || { id: null });
	} catch (err) {
		next(err);
	}
});

router.post('/logout', (req, res) => {
	req.session.user = undefined;
	res.sendStatus(200);
});

module.exports = router;
