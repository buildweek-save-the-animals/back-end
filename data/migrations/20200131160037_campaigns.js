const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

exports.up = tbl => {
	return tbl.schema.createTable('campaigns', tbl => {
		tbl.increments();

		tbl.string('title', 128)
			.notNullable()
			.unique();

		tbl.string('location', 128).notNullable();

		tbl.string('description', 1000).notNullable();

		tbl.string('urgency', 128).notNullable();

		tbl.integer('funding_goal').notNullable();

		tbl.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());

		tbl.integer('created_by')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('campaigns');
};
