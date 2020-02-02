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

const addDonation = async newDonation => {
	const id = await db('donations')
		.insert(newDonation)
		.returning('id');

	return db('donations')
		.where({ id: id[0] })
		.first();
};

const deleteDonation = async (donoId, token) => {
	const { id } = token;

	const { donated_by } = await db('donations')
		.where({ id: donoId })
		.first();

	if (id === donated_by) {
		return db('donations')
			.where({ id: donoId })
			.del();
	} else {
		return { message: 'You do not have permission to delete this donation' };
	}
};

module.exports = { getDonosWithTotal, getUserDonos, addDonation, deleteDonation };
