const Users = require('../auth/auth-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
    const { username, password, radio } = req.body;

	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
    if (!radio) return res.status(400).json({ message: 'Role required' });
    
    try {
        const checkForUniqueness = await Users.findByUsername(username.toLowerCase())

        checkForUniqueness
            ? res.status(400).json({ message: 'This username is already registered' })
            : next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ errMsg: "Error while verifying new user's username"})
    }
}

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;

	if (!username) return res.status(400).json({ message: 'Username required' });
	if (!password) return res.status(400).json({ message: 'Password required' });
	next();
};

module.exports = { validateNewUser, validateLogin };
