'use strict';

module.exports = function (sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    review: {
      type: DataTypes.TEXT
    }
  });

  Reviews.associate = function (models) {
    Reviews.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
    // Reviews.belongsTo(models.Recipes, {
    //   foreignKey: 'recipeId',
    //   as: 'recipe',
    //   onDelete: 'CASCADE',
    // });
  };
  return Reviews;
};