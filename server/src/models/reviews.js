module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    review: {
      type: DataTypes.TEXT,
    }
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
    Reviews.belongsTo(models.Recipes, {
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};
