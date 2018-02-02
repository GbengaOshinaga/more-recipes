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
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Votes);
    User.hasMany(models.Recipes);
    User.hasOne(models.NotificationsPreferences);
    User.belongsToMany(models.Recipes, { as: 'favouriteRecipes', through: 'Favourites' });
  };
  return User;
};
