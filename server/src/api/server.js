const cors = require('cors');
const express = require('express');

const server = express();

server.use(express.json());
server.use(cors());

module.exports = server;
