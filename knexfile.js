module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/save-the-animals.db3'
		},
		useNullAsDefault: true,
		migrations: {
			tableName: 'knex_migrations',
			directory: './data/migrations'
		},
		seeds: { directory: './data/seeds' },
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done);
			}
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			tableName: 'knex_migrations',
			directory: './data/migrations'
		},
		seeds: { directory: './data/seeds' }
	}
};