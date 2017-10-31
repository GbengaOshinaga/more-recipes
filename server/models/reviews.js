module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    review: {
      type: DataTypes.TEXT,
    }
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.User, {
      foreignKey: 'reviewId',
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};