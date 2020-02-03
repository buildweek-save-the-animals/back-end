const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
	describe('root router', () => {
		test('it should return an OK status code', async () => {
			const res = await request(server).get('/');

			expect(res.status).toEqual(200);
		});

		test('it should return a "Server up" message inside JSON object', async () => {
			const resMsg = { message: 'Server up' };
			const res = await request(server).get('/');

			expect(res.body).toEqual(resMsg);
		});

		test('it should return correct content type, "application/json"', async () => {
			const res = await request(server).get('/');

			expect(res.type).toEqual('application/json');
		});
	});
});
