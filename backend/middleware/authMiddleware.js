export function authUser(req, res, next) {
	if (!req.session.user.id) return res.sendStatus(401);
	next();
}
