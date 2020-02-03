const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{ id: 1, username: 'bernard', password: bcrypt.hashSync('password', 6), role: 'organization' },
			{ id: 2, username: 'jackson', password: bcrypt.hashSync('password', 6), role: 'support' },
			{ id: 3, username: 'april', password: bcrypt.hashSync('password', 6), role: 'organization' },
			{ id: 4, username: 'tristan', password: bcrypt.hashSync('password', 6), role: 'support' },
			{ id: 5, username: 'mark', password: bcrypt.hashSync('password', 6), role: 'organization' },
			{ id: 6, username: 'jen', password: bcrypt.hashSync('password', 6), role: 'support' }
		]);
	});
};
