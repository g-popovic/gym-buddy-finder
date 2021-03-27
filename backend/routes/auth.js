const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res, next) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const data = req.body;
		const newUser = new User(data);
		await newUser.save();
		req.session.user = { id: newUser._id };
		res.json({ id: newUser._id });
	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { password, email } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(401).send('Incorrect email');
		if (!(await bcrypt.compare(password, user.password)))
			return res.status(401).send('Incorrect password');

		req.session.user = { id: user._id };
		res.json({ id: user._id });
	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
	} catch (err) {
		next(err);
	}
});

router.get('/status', (req, res, next) => {
	try {
		console.log(req.session);
		res.json({
			id: req.session.user ? req.session.user.id : null
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
