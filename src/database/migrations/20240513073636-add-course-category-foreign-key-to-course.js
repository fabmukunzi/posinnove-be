'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('courses','categoryId',{
      type: Sequelize.UUID,
  allowNull: false,
  references: {
    model: 'course_categories',
    key: 'id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
      
    })
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'categoryId');
   
  }
};



