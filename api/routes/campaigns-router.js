const router = require('express').Router();

const Campaigns = require('../models/campaigns-model');

router.get('/:id', async (req, res) => {
	try {
		const campaign = await Campaigns.findById(req.params.id);

		campaign
			? res.status(200).json(campaign)
			: res.status(401).json({ message: 'No campaign found with that ID' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while getting campaign' });
	}
});

module.exports = router;
