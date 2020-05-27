const cron = require('node-cron');
const Promise = require('bluebird');

const { fetchUsers, creditDebitUser } = require('./credit-debit-users');

const transaction = async () => {
  // fetch all users
  console.log('transaction start...');
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
    console.log('transaction complete...');
  } catch (error) {
    console.error(error);
    console.log('transaction incomplete - Something went wrong...');
  }
};

const worker = async () => {
  console.log('worker launched....');
  await transaction();
  cron.schedule('0 0 * * *', async () => {
    await transaction();
  });
  console.log('cron set...');
};

worker();
