const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');

const { validateNewUser, validateLogin } = require('../middleware/validate-reg-and-login');

const signToken = user => {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role
	};

	const secret = process.env.JWT_SECRET || 'testSectet';

	const options = {
		expiresIn: '24h'
	};

	return jwt.sign(payload, secret, options);
};

const validateToken = (user, password, res) => {
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

router.post('/register', validateNewUser, async (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 6);
	user.password = hash;

	try {
		const saved = await Users.add(user);
		const token = signToken(saved);

		res.status(200).json({
			uid: saved.id,
			message: `Welcome, ${saved.username}`,
			role: user.radio,
			token
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while registering new user' });
	}
});

router.post('/login', validateLogin, async (req, res) => {
	let { username, password } = req.body;

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username)) {
		try {
			const user = await Users.findByUsername(username.toLowerCase());

			validateToken(user, password, res);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errMsg: 'Error while logging in' });
		}
	} else {
		try {
			const user = await Users.findByEmail(username.toLowerCase());

			validateToken(user, password, res);
		} catch (err) {
			console.log(err);
			res.status(500).json({ errMsg: 'Error while logging in' });
		}
	}
});

module.exports = router;
