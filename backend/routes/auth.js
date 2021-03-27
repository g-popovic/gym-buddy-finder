const router = require('express').Router();

router.get('/status', async (req, res) => {
	// TODO: Check session for logged in user's id

	res.json({
		user: {
			id: 'placeholder'
		}
	});
});

module.exports = router;
