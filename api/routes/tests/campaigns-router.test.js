const request = require('supertest');
const server = require('../../server');

const db = require('../../../data/dbConfig');
const Campaigns = require('../../models/campaigns-model');

const user_1 = {
	username: 'fooBar',
	email: 'fooBar@gmail.com',
	password: 'pass',
	radio: 'organization'
};

const campaign_1 = {
	title: 'test1',
	location: 'local host',
	description: 'testing',
	urgency: 'low',
	funding_goal: 0,
	created_by: 1
};

const campaign_2 = {
	title: 'test2',
	location: 'local host',
	description: 'testing',
	urgency: 'low',
	funding_goal: 0,
	created_by: 1
};

let token;

const initializeTest = async () => {
	await db('campaigns').insert(campaign_1);
	// const res = await request(server)
	// 	.post('/auth/register')
	// 	.send(user_1);
	// token = res.body.token;
};

const endTest = async () => {
	// await db('users').truncate();
	await db('campaigns').truncate();
};

beforeEach(async () => {
	return await initializeTest();
});

afterEach(async () => {
	return await endTest();
});

describe('campaign routes', () => {
	describe('/campaigns', () => {
		test('GET - should require an authorization token', async () => {
			const res = await request(server).get('/campaigns');

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('GET - should require non expired token', async () => {
			const res = await request(server)
				.get('/campaigns')
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});

		// test('GET - should return array of all campaigns', async () => {
		// 	const res = await request(server)
		// 		.get('/campaigns')
		// 		.set('Authorization', `Bearer ${token}`);
		// 	console.log('real token', token);
		// 	expect(res.status).toBe(401);
		// 	expect(res.body.message).toBe('test');
		// });

		test('POST - should require an authorization token', async () => {
			const res = await request(server)
				.post('/campaigns')
				.send(campaign_1);

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('POST - should require non expired token', async () => {
			const res = await request(server)
				.post('/campaigns')
				.send(campaign_1)
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});
	});

	describe('/campaigns/:id', () => {
		test('GET - should require an authorization token', async () => {
			const res = await request(server).get('/campaigns/2');

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('GET - should require non expired token', async () => {
			const res = await request(server)
				.get('/campaigns/2')
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});

		test('DELETE - should require an authorization token', async () => {
			const res = await request(server).delete('/campaigns/2');

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('DELETE - should require non expired token', async () => {
			const res = await request(server)
				.delete('/campaigns/2')
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});
		test('PUT - should require an authorization token', async () => {
			const res = await request(server)
				.put('/campaigns/2')
				.send(campaign_1);

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('PUT - should require non expired token', async () => {
			const res = await request(server)
				.put('/campaigns/2')
				.send(campaign_1)
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});
	});

	describe('/campaigns/search', () => {
		test('POST - should require an authorization token', async () => {
			const res = await request(server)
				.post('/campaigns/search')
				.send({ title: 'campaign_1' });

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('POST - should require non expired token', async () => {
			const res = await request(server)
				.post('/campaigns/search')
				.send({ title: 'campaign_1' })
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});
	});
});
