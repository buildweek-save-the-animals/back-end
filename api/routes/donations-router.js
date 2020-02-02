const router = require('express').Router();

const Donations = require('../models/donations-model');

// GET donations by project ID
router.get('/:id', async (req, res) => {
	try {
		const donations = await Donations.getDonosWithTotal(req.params.id);

		res.status(200).json(donations);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while getting donations' });
	}
});

// GET donations by user ID
router.get('/my_donations/:id', async (req, res) => {
	try {
		const donations = await Donations.getUserDonos(req.params.id);

		res.status(200).json(donations);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while getting user donations' });
	}
});

// POST new donation
router.post('/', async (req, res) => {
	try {
		const donation = await Donations.addDonation(req.body);

		res.status(200).json(donation);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while adding new donation to database' });
	}
});

module.exports = router;
