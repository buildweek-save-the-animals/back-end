const request = require('supertest');
const server = require('../server');

const db = require('../../data/dbConfig');

const user_1 = {
	username: 'foo',
	email: 'foo@gmail.com',
	password: 'bar',
	radio: 'organization'
};

const user_2 = {
	username: 'test',
	email: 'test@gmail.com',
	password: 'user',
	radio: 'organization'
};

beforeEach(async () => {
	return await db('users').insert(user_1);
});

afterEach(async () => {
	return await db('users').truncate();
});

describe('auth/user routes', () => {
	describe('/auth/register', () => {
		test('POST - should return JSON containing new user', async () => {
			const res = await request(server)
				.post('/auth/register')
				.send(user_2);

			expect(res.status).toBe(200);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Welcome, test');
		});

		test('POST - should not let same username sign up twice', async () => {
			const res = await request(server)
				.post('/auth/register')
				.send(user_1);

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('This username is already registered');
		});

		test('POST - should require username', async () => {
			const res = await request(server)
				.post('/auth/register')
				.send({ password: 'foo', radio: 'donor' });

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Username required');
		});

		test('POST - should require password', async () => {
			const res = await request(server)
				.post('/auth/register')
				.send({ username: 'foo', radio: 'donor' });

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Password required');
		});

		test('POST - should require role', async () => {
			const res = await request(server)
				.post('/auth/register')
				.send({ username: 'foo', password: 'bar' });

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Role required');
		});
	});

	describe('/auth/login', () => {
		test('POST - should return JSON containing user', async () => {
			await request(server)
				.post('/auth/register')
				.send({ username: 'testing', email: 'testing@gmail.com', password: 'login', radio: 'donor' });

			const res = await request(server)
				.post('/auth/login')
				.send({ username: 'testing', password: 'login' });

			expect(res.status).toBe(200);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Welcome back, testing');
		});

		test('POST - should not let unregistered user sign in', async () => {
			const res = await request(server)
				.post('/auth/login')
				.send({ username: 'bar', password: 'foo' });

			expect(res.status).toBe(401);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Invalid credentials');
		});

		test('POST - should require username', async () => {
			const res = await request(server)
				.post('/auth/register')
				.send({ password: 'foo' });

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Username required');
		});

		test('POST - should require password', async () => {
			const res = await request(server)
				.post('/auth/login')
				.send({ username: 'foo' });

			expect(res.status).toBe(400);
			expect(res.type).toBe('application/json');
			expect(res.body.message).toBe('Password required');
		});
	});
});
