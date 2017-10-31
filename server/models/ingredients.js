module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('Ingredients', {
    ingredient: {
      type: DataTypes.STRING,
    }
  });

  Ingredients.associate = (models) => {
    Ingredients.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };

  return Ingredients;
};