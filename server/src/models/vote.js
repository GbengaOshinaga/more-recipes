module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Votes;
};
