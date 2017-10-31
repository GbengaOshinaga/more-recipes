module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Reviews, {
      foreignKey: 'reviewId',
      as: 'reviews',
    });
    User.hasMany(models.Recipes, {
      foreignKey: 'recipeId',
      as: 'myRecipes',
    });
    User.hasMany(models.favouriteRecipes, {
      foreignKey: 'favouriteRecipesId',
      as: 'favouriteRecipes',
    });
  };
  return User;
};