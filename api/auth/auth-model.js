const db = require('../../data/dbConfig');

const findById = id => {
	return db('users')
		.where({ id })
		.first();
};

const add = async user => {
	const id = await db('users')
		.insert(user)
		.returning('id');

	return findById(id[0]).first();
};

const findByUsername = async username => {
	return db('users')
		.where(db.raw('LOWER(??)', ['users.username']), username)
		.first();
};

module.exports = { findById, add, findByUsername };