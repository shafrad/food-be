'use strict';
module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
    productId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  carts.associate = function(models) {
    // associations can be defined here
  };
  return carts;
};