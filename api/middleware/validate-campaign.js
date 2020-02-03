// prettier-ignore
module.exports = (req, res, next) => {
	const { title, location, description, urgency, funding_goal, created_by } = req.body;

	if (!title) return res.status(400).json({ message: 'Please include a title' });
	if (!location) return res.status(400).json({ message: 'Please include a location' });
	if (!description) return res.status(400).json({ message: 'Please include a description' });
	if (!urgency) return res.status(400).json({ message: 'Please include an urgency' });
	if (!funding_goal) return res.status(400).json({ message: 'Please include a funding goal' });
    if (!created_by) return res.status(400).json({ message: 'Please include the user ID of who created this campaign' });
    
    if (urgency !== ('low' || 'medium' || 'high')) {
        return (res.status(400).json({ message: 'Please set urgency to either "low", "medium", or "high" only' }))
    };

    next();
};
