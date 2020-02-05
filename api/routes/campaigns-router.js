const router = require('express').Router();

const Campaigns = require('../models/campaigns-model');

const validateData = require('../middleware/validate-campaign');

// GET all campaigns
router.get('/', async (__, res) => {
	try {
		const campaigns = await Campaigns.getAll();

		res.status(200).json(campaigns);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while getting campaigns' });
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
		return res.status(500).json({ errMsg: 'Error while getting campaign' });
	}
});

// POST search for campaign by title, case insensitive
router.post('/search', async (req, res) => {
	try {
		const campaign = await Campaigns.searchByTitle(req.body.title.toLowerCase());

		campaign
			? res.status(200).json(campaign)
			: res.status(401).json({ message: 'No campaign found with that title' });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while searching for campaign' });
	}
});

// POST add new project
router.post('/', validateData, async (req, res) => {
	try {
		const campaign = await Campaigns.add(req.body);

		res.status(200).json(campaign);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while adding new campaign to database' });
	}
});

// DELETE campaign
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Campaigns.remove(req.params.id, req.token);

		res.status(200).json(deleted);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while deleting campaign from database' });
	}
});

// PUT edit campaign
router.put('/:id', async (req, res) => {
	try {
		const campaign = await Campaigns.edit(req.params.id, req.body, req.token);

		res.status(200).json(campaign);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMsg: 'Error while editing campaign' });
	}
});

module.exports = router;
