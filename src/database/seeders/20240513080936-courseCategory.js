'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('course_categories', [{
      id: '21a97b56-9dad-4aac-ad42-cd99b3c68102',
      courseCategory: 'Programming',
      description: 'Courses related to programming',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('course_categories', null, {});
  }
};
