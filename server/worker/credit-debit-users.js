const axios = require('axios');

/**
 * Create instance of axios with a baseURL
 */
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

