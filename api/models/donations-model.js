const db = require('../../data/dbConfig');

const getDonosWithTotal = async donated_for => {
	const donations = await db
		.select('donations.donation_amount as amount', 'users.username as donated_by', 'donations.donated_at')
		.from('donations')
		.join('users', 'users.id', 'donations.donated_by')
		.where({ donated_for });

	const donoTotal = donations.reduce((acc, dono) => acc + dono.amount, 0);

	const noDonationsMsgObject = {
		amount: 0,
		donated_by: 'N/A',
		donated_at: 'N/A'
	};

	return donations.length
		? { total: donoTotal, donations }
		: { total: 'No donations yet', donations: [noDonationsMsgObject] };
};

const getUserDonos = async donated_by => {
	const donations = await db
		.select('donations.donation_amount as amount', 'donations.donated_at')
		.from('donations')
		.where({ donated_by });

	const noDonationsMsgObject = {
		amount: 0,
		donated_at: 'No donations yet'
	};

	return donations.length ? donations : [noDonationsMsgObject];
};

module.exports = { getDonosWithTotal, getUserDonos };
