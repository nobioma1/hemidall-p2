const getUserRouter = require('express').Router();

const { User } = require('../db/models');
const parseQuery = require('../middlewares/parse-query');

getUserRouter.get('/api/users', parseQuery, async (req, res, next) => {
  const limit = 500;
  const offset =
    req.query.page && req.query.page > 0 ? req.query.page * limit : 0;

  try {
    const users = await User.findAndCountAll({
      where: {
        ...req.queryParams.where,
      },
      order: req.queryParams.sortBy,
      limit,
      offset,
    });

    const nextPage =
      offset < users.count - limit
        ? (limit * req.query.page) / limit + 1
        : null;

    res.status(200).send({ nextPage, ...users });
  } catch (error) {
    next(error);
  }
});

module.exports = getUserRouter;
