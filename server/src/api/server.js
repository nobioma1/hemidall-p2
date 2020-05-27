const cors = require('cors');
const express = require('express');

const getUsers = require('../routes/get-users');
const createUser = require('../routes/create-user');
const userTransactions = require('../routes/user-transactions');
const errorHandler = require('../middlewares/error-handler');

const server = express();

server.use(express.json());
server.use(cors());

server.use(createUser);
server.use(getUsers);
server.use(userTransactions);
server.use(errorHandler);

module.exports = server;
