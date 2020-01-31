const date = new Date(Date.now());

exports.seed = function(knex) {
	return knex('campaigns').then(function() {
		return knex('campaigns').insert([
			{
				id: 1,
				title: 'rowValue1',
				location: 'Fountain, MI',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
				urgency: 'low',
				funding_goal: 100000,
				created_at: date.toDateString(),
				created_by: '1'
			},
			{
				id: 2,
				title: 'rowValue2',
				location: 'Ludington, MI',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				urgency: 'low',
				funding_goal: 10000,
				created_at: date.toDateString(),
				created_by: '2'
			},
			{
				id: 3,
				title: 'rowValue3',
				location: 'Manistee, MI',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				urgency: 'high',
				funding_goal: 1000,
				created_at: date.toDateString(),
				created_by: '3'
			},
			{
				id: 4,
				title: 'rowValue3',
				location: 'Traverse City, MI',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				urgency: 'medium',
				funding_goal: 500,
				created_at: date.toDateString(),
				created_by: '4'
			},
			{
				id: 5,
				title: 'rowValue3',
				location: 'New York, NY',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
				urgency: 'emergency',
				funding_goal: 100000000,
				created_at: date.toDateString(),
				created_by: '5'
			},
			{
				id: 6,
				title: 'rowValue3',
				location: 'Los Angeles, CA',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				urgency: 'high',
				funding_goal: 100,
				created_at: date.toDateString(),
				created_by: '6'
			}
		]);
	});
};
