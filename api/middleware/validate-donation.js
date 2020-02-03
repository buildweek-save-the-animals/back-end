module.exports = (req, res, next) => {
	const { donated_by, donated_for, donation_amount } = req.body;

	if (!donated_by) return res.status(400).json({ message: 'Please include the user ID of who donated' });
	if (!donated_for) return res.status(400).json({ message: 'Please include campaign ID' });
	if (!donation_amount) return res.status(400).json({ message: 'Please include a donation amount' });

	next();
};
