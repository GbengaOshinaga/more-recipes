module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    review: {
      type: DataTypes.TEXT,
    }
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      as: 'recipe',
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};