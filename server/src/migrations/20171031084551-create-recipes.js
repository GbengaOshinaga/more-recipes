
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    upvotes: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    },
    downvotes: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
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
        model: 'Users',
        key: 'id',
        as: 'UserId'
      }
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
