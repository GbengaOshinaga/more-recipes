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
      onDelete: 'CASCADE'
    });
    Recipes.hasMany(models.favouriteRecipes, {
      foreignKey: 'favId',
      as: 'favId',
      onDelete: 'CASCADE'
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

  };
  return Recipes;
};