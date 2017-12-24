module.exports = (sequelize, DataTypes) => {
  const NotificationsPreferences = sequelize.define('NotificationsPreferences', {
    email: {
      type: DataTypes.BOOLEAN
    },
    inApp: {
      type: DataTypes.BOOLEAN
    }
  });
  return NotificationsPreferences;
};
