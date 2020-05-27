const axios = require('axios');

/**
 * Create instance of axios with a baseURL
 */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

/**
 * Generate an integer between minimum and maximum integer
 * @param {*} max - maximum integer
 * @param {*} min - minimum integer, set to default 0
 *
 * @returns number
 */
const generateRandom = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

