const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		const secret = process.env.JWT_SECRET || 'testSectet';

		jwt.verify(authorization, secret, (err, decodedToken) => {
			if (!err) {
				req.token = decodedToken;
				next();
			} else {
				console.log('TOKEN ERROR', err);
				return res.status(401).json({ message: 'Invalid token' });
			}
		});
	} else {
		return res.status(400).json({ message: 'Please login and try again' });
	}
};
