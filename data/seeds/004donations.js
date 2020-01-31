const date = new Date(Date.now());

exports.seed = function(knex) {
	return knex('donations').then(function() {
		return knex('donations').insert([
			{ id: 1, donated_by: 6, donated_for: 3, donated_at: date.toDateString() },
			{ id: 2, donated_by: 5, donated_for: 2, donated_at: date.toDateString() },
			{ id: 3, donated_by: 4, donated_for: 1, donated_at: date.toDateString() },
			{ id: 3, donated_by: 3, donated_for: 6, donated_at: date.toDateString() },
			{ id: 3, donated_by: 2, donated_for: 5, donated_at: date.toDateString() },
			{ id: 3, donated_by: 1, donated_for: 4, donated_at: date.toDateString() }
		]);
	});
};
