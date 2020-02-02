const date = new Date(Date.now());

exports.seed = function(knex) {
	return knex('donations').then(function() {
		return knex('donations').insert([
			{ id: 1, donated_by: 6, donated_for: 3, donation_amount: 1000, donated_at: date.toDateString() },
			{ id: 2, donated_by: 5, donated_for: 2, donation_amount: 25, donated_at: date.toDateString() },
			{ id: 3, donated_by: 4, donated_for: 1, donation_amount: 100, donated_at: date.toDateString() },
			{ id: 4, donated_by: 3, donated_for: 6, donation_amount: 225, donated_at: date.toDateString() },
			{ id: 5, donated_by: 2, donated_for: 5, donation_amount: 200, donated_at: date.toDateString() },
			{ id: 6, donated_by: 1, donated_for: 4, donation_amount: 350, donated_at: date.toDateString() }
		]);
	});
};
