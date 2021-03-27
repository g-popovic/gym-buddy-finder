const router = require('express').Router();
const User = require('../models/user.model');

router.get('/status', async (req, res) => {
	res.json({
		user: {
			id: req.session.user ? req.session.user.id : null
		}
	});
});

module.exports = router;
