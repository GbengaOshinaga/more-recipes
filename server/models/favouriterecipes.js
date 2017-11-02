module.exports = (sequelize, DataTypes) => {
  const favouriteRecipes = sequelize.define('favouriteRecipes', {
    dateCreated: {
      type: DataTypes.DATE,
    },
  });

  favouriteRecipes.association = (models) => {
    favouriteRecipes.hasMany(models.Recipes, {
      foreignKey: 'recipesId',
      onDelete: 'SET NULL'
    });
    favouriteRecipes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return favouriteRecipes;
};
