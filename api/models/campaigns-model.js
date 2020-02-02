const db = require('../../data/dbConfig');

const findById = async id => {
	const [campaign, donations] = await Promise.all([
		db
			.select('campaigns.*', 'users.username as created_by')
			.from('campaigns')
			.where(db.raw('campaigns.id = ?', [id]))
			.join('users', 'campaigns.created_by', 'users.id')
			.first(),

		db
			.select(
				'donations.donation_amount as donation',
				'donations.donated_at',
				'users.username as donated_by'
			)
			.from('donations')
			.join('users', 'donated_by', 'users.id')
			.where({ donated_for: id })
			.orderBy('donated_at', 'desc')
	]);

	const total_donations = donations.length ? donations : ['No donations for this campaign yet'];

	return {
		...campaign,
		total_donations
	};
};

module.exports = { findById };
