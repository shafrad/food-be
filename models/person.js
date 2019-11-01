'use strict';
module.exports = (sequelize, DataTypes) => {
  const persons = sequelize.define('persons', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  persons.associate = function(models) {
    // associations can be defined here
  };
  return persons;
};