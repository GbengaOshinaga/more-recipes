module.exports = (sequelize, DataTypes) => {
  const favouriteRecipes = sequelize.define('favouriteRecipes', {
    userId: {
      type: DataTypes.INTEGER,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    }
  });

  favouriteRecipes.association = (models) => {
    favouriteRecipes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    favouriteRecipes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return favouriteRecipes;
};
