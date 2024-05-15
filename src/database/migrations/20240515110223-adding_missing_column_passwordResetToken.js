'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'passwordResetToken', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: true
    });
  
  await queryInterface.addColumn('users', 'passwordResetExpires', {
    type: Sequelize.DATE,
    allowNull: true,
  })},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'passwordResetToken');
    await queryInterface.removeColumn('users', 'passwordResetExpires');
  }
}