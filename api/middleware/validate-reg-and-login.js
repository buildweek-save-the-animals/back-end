const Users = require('../auth/auth-model');

// prettier-ignore
const validateNewUser = async (req, res, next) => {
    const { username, password, role } = req.body;

	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
    !role && res.status(400).json({ message: 'Role required' });
    
    try {
        const checkForUniqueness = await Users.findByUsername(username.toLowerCase())

        checkForUniqueness
            ? res.status(400).json({ message: 'This username is already registered' })
            : next()
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ errMsg: "Error while verifying new user's username"})
    }
}

const validateLogin = (req, res, next) => {
	const { username, password } = req.body;
	!username && res.status(400).json({ message: 'Username required' });
	!password && res.status(400).json({ message: 'Password required' });
	next();
};

module.exports = { validateNewUser, validateLogin };
