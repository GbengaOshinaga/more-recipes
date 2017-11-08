'use strict';

module.exports = function (sequelize, DataTypes) {
  var Votes = sequelize.define('votes', {
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    recipeId: {
      type: DataTypes.INTEGER
    }
  });

  // Votes.associate = (models) => {
  //   Votes.hasOne(models.Recipes, {
  //     foreignKey: 'recipeId',
  //     onDelete: 'CASCADE',
  //   });
  // };
  return Votes;
};