const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
	return knex('users').then(function() {
		return knex('users').insert([
			{
				id: 1,
				username: 'bernard',
				email: 'bernard@gmail.com',
				password: bcrypt.hashSync('password', 6),
				radio: 'organization'
			},
			{
				id: 2,
				username: 'jackson',
				email: 'jackson@gmail.com',
				password: bcrypt.hashSync('password', 6),
				radio: 'support'
			},
			{
				id: 3,
				username: 'april',
				email: 'april@gmail.com',
				password: bcrypt.hashSync('password', 6),
				radio: 'organization'
			},
			{
				id: 4,
				username: 'tristan',
				email: 'tristan@gmail.com',
				password: bcrypt.hashSync('password', 6),
				radio: 'support'
			},
			{
				id: 5,
				username: 'mark',
				email: 'mark@gmail.com',
				password: bcrypt.hashSync('password', 6),
				radio: 'organization'
			},
			{
				id: 6,
				username: 'jen',
				email: 'jen@gmail.com',
				password: bcrypt.hashSync('password', 6),
				radio: 'support'
			}
		]);
	});
};
