module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('votes', {
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
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