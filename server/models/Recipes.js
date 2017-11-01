module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    }
  });

  Recipes.associate = (models) => {
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'reviewId',
      as: 'reviews',
    });
    Recipes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Recipes.hasOne(models.votes, {
      foreignKey: 'votesId',
      as: 'votes',
      onDelete: 'CASCADE',
    });
    // Recipes.belongsTo(models.favouriteRecipes, {
    //   foreignKey: 'favouriteRecipe',
    //   as: 'favouriteRecipeId'
    // });
  };
  return Recipes;
};