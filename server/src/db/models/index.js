const { DataTypes, Model } = require('sequelize');

const sequelize = require('../connection');

class User extends Model {}
User.init(
  {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    walletBalance: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    modelName: 'user',
    sequelize,
  }
);

module.exports = { User };
