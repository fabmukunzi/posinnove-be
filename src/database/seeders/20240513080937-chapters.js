'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('chapters', [{
      id: '21a97b56-9dad-4aac-ad42-cd99b3c68103',
      title: 'Introduction to Variables',
      description: 'Learn about variables and data types in JavaScript',
      chaptersImages: null, 
      chaptersThumbnails: 'path/to/thumbnail.jpg',
      contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      courseId: '21a97b56-9dad-4aac-ad42-cd99b3c68104', 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chapters', null, {});
  }
};
