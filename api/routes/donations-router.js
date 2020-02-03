const router = require('express').Router();

const Donations = require('../models/donations-model');

const restricted = require('../auth/auth-middleware');

const validateData = require('../middleware/validate-donation');

// GET donations by project ID
router.get('/:id', restricted, async (req, res) => {
	try {
		const donations = await Donations.getDonosWithTotal(req.params.id);

		res.status(200).json(donations);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while getting donations' });
	}
});

// GET donations by user ID
router.get('/my_donations/:id', restricted, async (req, res) => {
	try {
		const donations = await Donations.getUserDonos(req.params.id);

		res.status(200).json(donations);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while getting user donations' });
	}
});

// POST new donation
router.post('/', restricted, validateData, async (req, res) => {
	try {
		const donation = await Donations.addDonation(req.body);

		res.status(200).json(donation);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while adding new donation to database' });
	}
});

// DELETE donation by ID
router.delete('/:id', restricted, async (req, res) => {
	try {
		const deleted = await Donations.deleteDonation(req.params.id, req.token);

		res.status(200).json(deleted);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while deleting donation from database' });
	}
});

module.exports = router;
