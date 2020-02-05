const bcrypt = require('bcryptjs');
const signToken = require('./signToken');

module.exports = (user, password, res) => {
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = signToken(user);

		return res.status(200).json({
			uid: user.id,
			message: `Welcome back, ${user.username}`,
			role: user.radio,
			token
		});
	}
	res.status(401).json({ message: 'Invalid credentials' });
};
