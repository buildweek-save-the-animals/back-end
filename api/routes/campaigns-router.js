const router = require('express').Router();

const Campaigns = require('../models/campaigns-model');

// GET all campaigns
router.get('/', async (__, res) => {
	try {
		const campaigns = await Campaigns.getAll();

		res.status(200).json(campaigns);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while getting campaigns' });
	}
});

// GET campaign by ID
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

// POST search for campaign by title, case insensitive
router.post('/search', async (req, res) => {
	try {
		const campaign = await Campaigns.searchByCampaignTitle(req.body.title.toLowerCase());

		campaign
			? res.status(200).json(campaign)
			: res.status(401).json({ message: 'No campaign found with that title' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while searching for campaign' });
	}
});

// POST add new project
router.post('/', async (req, res) => {
	try {
		const campaign = await Campaigns.addCampaign(req.body);

		res.status(200).json(campaign);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errMsg: 'Error while adding new campaign to database' });
	}
});

module.exports = router;
