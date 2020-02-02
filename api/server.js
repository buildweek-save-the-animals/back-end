const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../api/auth/auth-router');
const campaignRouter = require('../api/routes/campaigns-router');

const logger = (req, __, next) => {
	const date = new Date(Date.now());
	console.log(`${req.method} to ${req.originalUrl} at ${date.toDateString()}, ${date.toTimeString()}`);
	next();
};

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json(), logger);

server.use('/auth', authRouter);
server.use('/campaigns', campaignRouter);

server.use('/', (__, res) => {
	res.send('Server up');
});

module.exports = server;
