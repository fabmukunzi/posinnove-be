'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('courses', [{
      id: '21a97b56-9dad-4aac-ad42-cd99b3c68104',
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming language',
      courseThumbnail: 'path/to/thumbnail.jpg',
      tutorId: '21a97b56-9dad-4aac-ad42-cd99b3c68109', 
      categoryId:'21a97b56-9dad-4aac-ad42-cd99b3c68102',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('courses', null, {});
  }
};
