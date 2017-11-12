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
      unique: true,
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
  //   User.hasMany(models.Reviews, {
  //     foreignKey: 'reviewId',
  //     as: 'reviews',
  //   });
    User.hasMany(models.Recipes);
    User.belongsToMany(models.Recipes, { as: 'favouriteRecipes', through: 'Favourites' });
  };
  return User;
};
