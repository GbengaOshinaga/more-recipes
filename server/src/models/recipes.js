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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Recipes.associate = (models) => {
    Recipes.hasMany(models.Reviews);
    Recipes.hasMany(models.Votes, { onDelete: 'CASCADE' });
    Recipes.belongsTo(models.User);
    Recipes.belongsToMany(models.User, { as: 'favouriteUsers', through: 'Favourites' });
  };
  return Recipes;
};
