const request = require('supertest');
const server = require('../../server');

const db = require('../../../data/dbConfig');

const donation = {
	donated_by: 99,
	donated_for: 99,
	donation_amount: 999
};

beforeEach(async () => {
	await db('donations').insert(donation);
});

afterEach(async () => {
	await db('donations').truncate();
});

describe('donation routes', () => {
	describe('/donations', () => {
		test('POST - should require an authorization token', async () => {
			const res = await request(server)
				.post('/donations')
				.send(donation);

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('POST - should require non expired token', async () => {
			const res = await request(server)
				.post('/donations')
				.send(donation)
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});
	});

	describe('/donations/:id', () => {
		test('GET - should require an authorization token', async () => {
			const res = await request(server).get('/donations/2');

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('GET - should require non expired token', async () => {
			const res = await request(server)
				.get('/donations/2')
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});

		test('DELETE - should require an authorization token', async () => {
			const res = await request(server).delete('/donations/2');

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Please login and try again');
		});

		test('DELETE - should require non expired token', async () => {
			const res = await request(server)
				.delete('/donations/2')
				.set('Authorization', 'Bearer 123');

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid token');
		});
	});
});
