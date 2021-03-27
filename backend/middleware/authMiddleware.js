const { isValidObjectId } = require('mongoose');

export function authUser(req, res, next) {
	if (!req.session.user.id || !isValidObjectId(req.session.user.id)) return res.sendStatus(401);
	req.user = req.session.user;
	next();
}
