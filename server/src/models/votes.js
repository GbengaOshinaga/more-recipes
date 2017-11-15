module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Votes.associate = (models) => {
  //   Votes.hasOne(models.Recipes, {
  //     foreignKey: 'recipeId',
  //     onDelete: 'CASCADE',
  //   });
  // };
  return Votes;
};
