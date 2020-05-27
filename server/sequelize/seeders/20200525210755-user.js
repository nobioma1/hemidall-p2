'use strict';
const { generateUsers } = require('../../factory/user-factory');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = generateUsers(50000);
    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
