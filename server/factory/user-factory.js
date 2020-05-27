const faker = require('faker');

const createUser = function (
  payload = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
) {
  return payload;
};

const generateUsers = (count) => {
  return Array.from({ length: count }, createUser);
};

module.exports = { createUser, generateUsers };
