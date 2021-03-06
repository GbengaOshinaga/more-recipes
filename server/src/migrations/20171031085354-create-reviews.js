
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    review: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    RecipeId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
      }
    },
    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users'
      }
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Reviews')
};
