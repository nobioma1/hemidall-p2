const { CustomError } = require('../errors/custom-error');

/**
 * **validateUserBody** validate the req.body object to create a user
 *
 * @param {*} req - contain a body object
 * @param {*} res
 * @param {*} next
 */
const validateUserBody = (req, res, next) => {
  if (!req.body.fullName && !req.body.lastName) {
    throw new CustomError('"fullName" and "lastName" is required');
  }

  next();
};

module.exports = validateUserBody;
