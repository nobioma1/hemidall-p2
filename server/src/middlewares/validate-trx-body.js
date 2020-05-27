const { CustomError } = require('../errors/custom-error');

/**
 * **ValidateTrxBody** validate req.body object for transactions
 * - check is type property
 * - check if type is either CREDIT or DEBIT
 * - check is amount property and is  not equal to 0
 * - check is amount is a positive number
 *
 * @param {*} req - contains body object
 * @param {*} res
 * @param {*} next
 */
const validateTrxBody = (req, res, next) => {
  if (!req.body.type) {
    throw new CustomError('"type" is required');
  }

  if (req.body.type !== 'CREDIT' && req.body.type !== 'DEBIT') {
    throw new CustomError('"type" can either be CREDIT or DEBIT');
  }

  if (!req.body.amount && req.body.amount !== 0) {
    throw new CustomError('"amount" is required');
  }

  const amount = Number(req.body.amount);

  if (Number.isNaN(amount) || amount <= 0) {
    throw new CustomError('"amount" must be a number and greater than 0');
  }

  next();
};

module.exports = validateTrxBody;
