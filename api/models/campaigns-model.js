const db = require('../../data/dbConfig');

const findById = async id => {
	return db
		.select('campaigns.*')
		.from('campaigns')
		.join('donations', 'campaigns.id', 'donations.donated_for')
		.where({ id });
};
