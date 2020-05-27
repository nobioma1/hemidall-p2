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

/**
 * makes API request to fetch all pages of users
 * @returns array of users
 */
exports.fetchUsers = async () => {
  let users = [];
  let isFetching = true;
  let page = 0;

  console.log('fetching users...');
  while (isFetching) {
    try {
      if (page !== null) {
        const res = await axiosInstance.get(`/?page=${page}`);
        users = [...users, ...res.data.rows];
        page = res.data.nextPage;
      } else {
        isFetching = false;
      }
    } catch (error) {
      console.log(error.message);
      isFetching = false;
    }
  }
  console.log(`fetch complete... ${users.length} users.`);
  return users;
};

let i = 0; // hold count of transactions
/**
 * Make API request to transactions to perform DEBIT or CREDIT transactions
 *
 * Randomly generate amount to be Debited or Credited to user.
 *
 * Log actions and count
 *
 * @param {*} payload { user, type }
 * @returns Promise<Transaction>
 */
exports.creditDebitUser = ({ user, type }) => {
  const amount =
    type === 'DEBIT'
      ? generateRandom(user.walletBalance, 1)
      : generateRandom(5000, 1000);

  i++;
  console.log(
    `no.: ${i} | userId: ${user.id} | type: ${type} | amt: ${amount}`
  );

  return axiosInstance.post(`/${user.id}/transactions`, { type, amount });
};
