'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    total: DataTypes.INTEGER,
    state: DataTypes.STRING,
    personId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'persons',
        key: 'id'
      }
    },
    completedAt: DataTypes.DATE
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};