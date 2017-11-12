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
    Recipes.hasMany(models.Reviews);
    Recipes.belongsTo(models.User);
    Recipes.hasOne(models.votes, { onDelete: 'CASCADE' });
    Recipes.belongsToMany(models.User, { as: 'favouriteUsers', through: 'Favourites' });
  };
  return Recipes;
};
