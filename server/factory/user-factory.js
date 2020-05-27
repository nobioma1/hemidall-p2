const faker = require('faker');

const createUser = function (
  payload = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
) {
  return payload;
};

module.exports = { createUser };
