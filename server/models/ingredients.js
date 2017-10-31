module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('Ingredients', {
    ingredient: {
      type: DataTypes.STRING,
    }
  });

  Ingredients.associate = (models) => {
    Ingredients.belongsTo(models.User, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };

  return Ingredients;
};