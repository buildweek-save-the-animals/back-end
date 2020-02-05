const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../api/auth/auth-router');
const campaignsRouter = require('../api/routes/campaigns-router');
const donationsRouter = require('../api/routes/donations-router');

const restricted = require('./auth/auth-middleware');

const logger = require('./middleware/logger');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json(), logger);

server.use('/auth', authRouter);
server.use('/campaigns', restricted, campaignsRouter);
server.use('/donations', restricted, donationsRouter);

server.use('/', (__, res) => {
	res.status(200).json({ message: 'Server up' });
});

module.exports = server;
