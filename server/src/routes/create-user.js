const createUserRouter = require('express').Router();

const { User } = require('../db/models');
const validateUserBody = require('../middlewares/validate-user-body');

createUserRouter.post(
  '/api/users',
  validateUserBody,
  async (req, res, next) => {
    try {
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.firstName,
      });

      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = createUserRouter;
