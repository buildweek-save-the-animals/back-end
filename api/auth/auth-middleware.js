const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;
	const secret = process.env.JWT_SECRET;

	if (authorization) {
		jwt.verify(authorization, secret, (err, decodedToken) => {
			if (!err) {
				req.token = decodedToken;
				next();
			}
			console.log(err);
			res.status(401).json({ message: 'Invalid token' });
		});
	}
	res.status(400).json({ message: 'Please login and try again' });
};
