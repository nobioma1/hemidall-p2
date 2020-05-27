const { CustomError } = require('../errors/custom-error');

const isDeductible = (req, res, next) => {
  if (
    req.body.type === 'DEBIT' &&
    req.user.walletBalance < parseFloat(req.body.amount)
  ) {
    throw new CustomError('Amount is not deductible from balance');
  }

  next();
};

module.exports = isDeductible;
