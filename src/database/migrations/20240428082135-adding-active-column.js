'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true // You can set a default value if needed
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'active');
  }
};
