const Campaigns = require('../campaigns-model');

const db = require('../../../data/dbConfig');

const campaigns = [
	{
		title: 'Testing',
		location: 'Testing, MI',
		description: 'testing testing testing',
		urgency: 'low',
		funding_goal: 10,
		created_by: 1
	},
	{
		title: 'Testing2',
		location: 'Testing2, MI',
		description: 'testing testing testing',
		urgency: 'medium',
		funding_goal: 100,
		created_by: 1
	}
];

const newCampaign = () => {
	return {
		title: 'Testing3',
		location: 'Testing3, MI',
		description: 'testing testing testing',
		urgency: 'medium',
		funding_goal: 1000,
		created_by: 1
	};
};

const user = {
	username: 'foo',
	email: 'foo@gmail.com',
	password: 'bar',
	radio: 'organization'
};

const uid = {
	id: 1
};

beforeEach(async () => {
	await db('users').insert(user);
	await db('campaigns').insert(campaigns);
});

afterEach(async () => {
	await db('campaigns').truncate();
	await db('users').truncate();
});

describe('campaigns model', () => {
	describe('getAll()', () => {
		test('should return an array', async () => {
			const campaigns = await Campaigns.getAll();

			expect(Array.isArray(campaigns)).toBe(true);
		});

		// test('should return all campaigns found in db', async () => {
		// 	const campaigns = await Campaigns.getAll();

		// 	expect(campaigns.length).toBe(2);
		// 	expect(campaigns[0].id).toBe(1);
		// 	expect(campaigns[1].title).toBe('Testing2');
		// });
	});

	// describe('findById()', () => {
	// 	test('should return a single campaign', async () => {
	// 		const campaign = await Campaigns.findById(2);
	// 		console.log(' : campaign', campaign);

	// 		expect(campaign.length).toBe(1);
	// 		expect(campaign.title).toBe('Testing2');
	// 	});
	// });

	describe('searchByTitle()', () => {
		// test('should return campaign if campaign exists', async () => {
		// 	const campaign = await Campaigns.searchByTitle('Testing2'.toLowerCase());

		// 	expect(campaign.title).toBe('Testing2');
		// });

		test('should return undefined if campaign doesn not exist', async () => {
			const campaign = await Campaigns.searchByTitle('Test'.toLowerCase());

			expect(campaign).toBe(undefined);
		});
	});

	describe('add()', () => {
		test('should return added campaign', async () => {
			const campaign = await Campaigns.add(newCampaign());

			expect(campaign.title).toBe('Testing3');
		});

		test('should require title', async () => {
			const addNew = newCampaign();
			delete addNew.title;
			try {
				await Campaigns.add(addNew);
			} catch (err) {
				expect(err.code).toBe('SQLITE_CONSTRAINT');
			}
		});

		test('should require location', async () => {
			const addNew = newCampaign();
			delete addNew.location;
			try {
				await Campaigns.add(addNew);
			} catch (err) {
				expect(err.code).toBe('SQLITE_CONSTRAINT');
			}
		});

		test('should require description', async () => {
			const addNew = newCampaign();
			delete addNew.description;
			try {
				await Campaigns.add(addNew);
			} catch (err) {
				expect(err.errno).toBe(19);
				expect(err.code).toBe('SQLITE_CONSTRAINT');
			}
		});

		test('should require urgency', async () => {
			const addNew = newCampaign();
			delete addNew.urgency;
			try {
				await Campaigns.add(addNew);
			} catch (err) {
				expect(err.code).toBe('SQLITE_CONSTRAINT');
			}
		});

		test('should require funding goal', async () => {
			const addNew = newCampaign();
			delete addNew.funding_goal;
			try {
				await Campaigns.add(addNew);
			} catch (err) {
				expect(err.code).toBe('SQLITE_CONSTRAINT');
			}
		});

		test('should require ID for creator', async () => {
			const addNew = newCampaign();
			delete addNew.created_by;
			try {
				await Campaigns.add(addNew);
			} catch (err) {
				expect(err.code).toBe('SQLITE_CONSTRAINT');
			}
		});
	});

	describe('remove()', () => {
		test('should return number of records deleted', async () => {
			const deleted = await Campaigns.remove(1, uid);

			expect(deleted).toBe(1);
		});
	});

	describe('edit()', () => {
		test('should return edited object', async () => {
			await Campaigns.add(newCampaign());
			const edited = newCampaign();
			newCampaign.title = 'Testing3';
			const edit = await Campaigns.edit(1, edited, uid);

			expect(edit.title).toBe('Testing3');
		});
	});
});
