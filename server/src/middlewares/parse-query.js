/**
 * Parse and validate user given query parameters includes
 * adds structured queryParams to req object.
 *
 * Allowed Query parameters { firstName:string, lastName:string, walletBalance:number, page: number }
 * @param {*} req contains query object
 * @param {*} res
 * @param {*} next
 */
const parseQuery = (req, res, next) => {
  const query = req.query;

  const queryParams = {
    where: {},
    sortBy: null,
  };
  const validParams = ['firstName', 'lastName', 'walletBalance'];

  // parse searching/filtering by name or balance params
  Object.entries(query).forEach(([key, value]) => {
    if (validParams.includes(key) && value) {
      if (typeof value === 'number') {
        queryParams.where[key] = parseFloat(value, 10);
      } else {
        queryParams.where[key] = value;
      }
    }
  });

  // parse sortBy - check if the keys are valid
  // case where there is more than one sortBy resulting to an []
  if (Array.isArray(query.sortBy)) {
    queryParams['sortBy'] = query.sortBy.filter((item) =>
      validParams.includes(item)
    );
  } else if (
    // case where there is sortBy resulting to a 'string'
    typeof query.sortBy == 'string' &&
    validParams.includes(query.sortBy)
  ) {
    queryParams['sortBy'] = [query.sortBy];
  }
  req.queryParams = queryParams;
  next();
};

module.exports = parseQuery;
