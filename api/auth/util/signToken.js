const jwt = require('jsonwebtoken');

module.exports = user => {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role
	};

	const secret = process.env.JWT_SECRET || 'testSecret';

	const options = {
		expiresIn: '24h'
	};

	return jwt.sign(payload, secret, options);
};
