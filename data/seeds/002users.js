exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{ id: 1, username: 'bernard', password: 'password', role: 'organization' },
			{ id: 2, username: 'jackson', password: 'password', role: 'support' },
			{ id: 3, username: 'april', password: 'password', role: 'organization' },
			{ id: 4, username: 'tristan', password: 'password', role: 'support' },
			{ id: 5, username: 'mark', password: 'password', role: 'organization' },
			{ id: 6, username: 'jen', password: 'password', role: 'support' }
		]);
	});
};
