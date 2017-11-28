module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificationsPreferences', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.BOOLEAN
    },
    inApp: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users'
      }
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('NotificationsPreferences')
};
