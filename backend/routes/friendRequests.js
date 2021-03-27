const router = require('express').Router();
const User = require('../models/user.model');
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
				}
			},
			{ $push: { friendRequests: { id, message } } }
		);

		if (!result.n) return res.sendStatus(403);
		res.sendStatus(200);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
