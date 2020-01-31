const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.up = tbl => {
	return tbl.schema.createTable('donations', tbl => {
		tbl.increments();

		tbl.integer('donated_by')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.integer('donated_for')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('campaigns')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.timestamp('donated_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('donations');
};
