const cron = require('node-cron');
const Promise = require('bluebird');

const { fetchUsers, creditDebitUser } = require('./credit-debit-users');

const transaction = async () => {
  // fetch all users
  const users = await fetchUsers();

  try {
    // Promise.map to  resolve when all promises are resolved
    await Promise.map(
      users,
      (user) => {
        // return Promise(Do DEBIT if CREDIT is successful)
        return creditDebitUser({ user, type: 'CREDIT' }).then(() =>
          creditDebitUser({ user, type: 'DEBIT' })
        );
      },
      { concurrency: 80 } // pool concurrent requests to 80 requests at a time
    );
  } catch (error) {
    console.error(error);
  }
};

const worker = () => {
  console.log('worker launched....');
  cron.schedule('0 0 * * *', async () => {
    console.log('transaction start...');
    await transaction();
    console.log('transaction complete...');
  });
};

worker();
