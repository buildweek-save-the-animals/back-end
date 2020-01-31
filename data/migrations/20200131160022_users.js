exports.up = tbl => {
	return tbl.schema.createTable('users', tbl => {
		tbl.increments();

		tbl.string('username', 128)
			.notNullable()
			.unique();

		tbl.string('password', 128).notNullable();

		tbl.string('role', 128).notNullable();
	});
};

exports.down = tbl => {
	return tbl.schema.dropTableIfExists('users');
};
