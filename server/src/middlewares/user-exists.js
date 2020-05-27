const { User } = require('../db/models');
const { CustomError } = require('../errors/custom-error');

/**
 * Check if user id in req.params is a Number and is valid
 * for and existing user in the database.
 *
 * Throw error is user is not valid or bad user id
 *
 * Add user object to request if user id is valid.
 * @param {*} req - contains params object
 * @param {*} res
 * @param {*} next
 */
const userExists = async (req, res, next) => {
  try {
    if (!Number.isInteger(Number(req.params.id))) {
      throw new CustomError('User id should be an integer');
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new CustomError('User does not Exist', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExists;
