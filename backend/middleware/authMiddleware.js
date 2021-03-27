const { isValidObjectId } = require('mongoose');

function authUser(req, res, next) {
	if (!req.session.user || !req.session.user.id || !isValidObjectId(req.session.user.id))
		return res.sendStatus(401);
	req.user = req.session.user;
	next();
}

module.exports = {
	authUser
};
