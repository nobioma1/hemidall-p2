const userTransactions = require('express').Router();

const { User } = require('../db/models');
const userExists = require('../middlewares/user-exists');
const validateTrxBody = require('../middlewares/validate-trx-body');
const isDeductible = require('../middlewares/is-deductible');

const balance = (walletBalance, type, amount) => {
  if (type === 'CREDIT') {
    return walletBalance + amount;
  }
  if (type === 'DEBIT') {
    return walletBalance - amount;
  }
};

userTransactions.post(
  '/api/users/:id/transactions',
  userExists,
  validateTrxBody,
  isDeductible,
  async (req, res, next) => {
    const { user, body, params } = req;

    try {
      const [_, updated] = await User.update(
        {
          walletBalance: balance(user.walletBalance, body.type, body.amount),
        },
        {
          where: {
            id: params.id,
          },
          returning: true,
          plain: true,
        }
      );

      res.status(200).send(updated);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userTransactions;
