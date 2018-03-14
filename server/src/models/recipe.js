module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    upvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    downvotes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
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
