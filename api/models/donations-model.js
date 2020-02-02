const db = require('../../data/dbConfig');

const getDonosWithTotal = async donated_for => {
	const donations = await db
		.select('donations.donation_amount as amount', 'users.username as donated_by', 'donations.donated_at')
		.from('donations')
		.join('users', 'users.id', 'donations.donated_by')
		.where({ donated_for });

	const donoTotal = donations.reduce((acc, dono) => acc + dono.amount, 0);

	return donations.length
		? { total: donoTotal, donations }
		: { total: 'No donations yet', donations: [{ amount: 'N/A', donated_by: 'N/A', donated_at: 'N/A' }] };
};

module.exports = { getDonosWithTotal };
