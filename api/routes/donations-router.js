const router = require('express').Router();

const Donations = require('../models/donations-model');

router.get('/:id', async (req, res) => {
	try {
		const donations = await Donations.getDonosWithTotal(req.params.id);

		res.status(200).json(donations);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while getting donations' });
	}
});

router.get('/my_donations/:id', async (req, res) => {
	try {
		const donations = await Donations.getUserDonos(req.params.id);

		res.status(200).json(donations);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while getting user donations' });
	}
});

module.exports = router;
