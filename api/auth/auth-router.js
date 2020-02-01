const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

const signToken = user => {
	const payload = {
		username: user.username,
		role: user.role
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '24h'
	};

	return jwt.sign(payload, secret, options);
};

const validateToken = (user, password, res) => {
	console.log(' : validateToken -> user', user);
	if (user && bcrypt.compareSync(password, user.password)) {
		const token = signToken(user);

		res.status(200).json({
			uid: user.id,
			message: `Welcome back, ${user.username}`,
			token
		});
	}
	res.status(401).json({ message: 'Invalid credentials' });
};

router.post('/register', async (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 6);
	user.password = hash;

	try {
		const saved = await Users.add(user);
		const token = signToken(saved);

		res.status(200).json({
			uid: saved.id,
			token,
			message: `Welcome, ${saved.username}`
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while registering new user' });
	}
});

router.post('/login', async (req, res) => {
	let { username, password } = req.body;

	try {
		const user = await Users.findByUsername(username.toLowerCase());

		validateToken(user, password, res);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while logging in' });
	}
});

module.exports = router;
