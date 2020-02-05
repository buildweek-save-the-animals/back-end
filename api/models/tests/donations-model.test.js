const Donations = require('../donations-model');

const db = require('../../../data/dbConfig');

const donations = [
	{
		id: 1,
		donated_by: 1,
		donated_for: 1,
		donation_amount: 10,
		donated_at: 'today'
	},
	{
		id: 2,
		donated_by: 1,
		donated_for: 1,
		donation_amount: 20,
		donated_at: 'today'
	}
];

const newDono = () => {
	return {
		donated_by: 1,
		donated_for: 1,
		donation_amount: 30
	};
};

const user = {
	username: 'foo',
	email: 'foo@gmail.com',
	password: 'bar',
	radio: 'organization'
};

const campaign = {
	title: 'Testing',
	location: 'Testing, MI',
	description: 'testing testing testing',
	urgency: 'low',
	funding_goal: 10,
	created_by: 1
};

const uid = {
	id: 1
};

beforeEach(async () => {
	await db('users').insert(user);
	await db('campaigns').insert(campaign);
	await db('donations').insert(donations);
});

afterEach(async () => {
	await db('donations').truncate();
	await db('campaigns').truncate();
	await db('users').truncate();
});

describe('donations model', () => {
	describe('getDonosWithTotal()', () => {
		test('should return a donations object with donations array', async () => {
			const donations = await Donations.getDonosWithTotal(1);

			expect(donations.total).toBe(30);
			expect(donations.donations.length).toBe(2);
		});
	});

	describe('getUserDonos()', () => {
		test('should return donations array', async () => {
			const donations = await Donations.getUserDonos(1);

			expect(donations.length).toBe(2);
		});
	});

	describe('addDonation()', () => {
		test('should return added donation', async () => {
			const donation = await Donations.addDonation(newDono());

			expect(donation.id).toBe(3);
		});
	});

	describe('deleteDonation()', () => {
		test('should return number of records deleted', async () => {
			const deleted = await Donations.deleteDonation(1, uid);

			expect(deleted).toBe(1);
		});
	});
});

//deleteDonation
