const db = require('../../data/dbConfig');

const getDonosWithTotal = async donated_for => {
	const donations = await db('donations').where({ donated_for });

	return donations;
};

module.exports = { getDonosWithTotal };
