'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('defaultTable', [
      {
        id: uuidv4(),
        expertise: ['Programming', 'Software Engineering', 'Networking'],
        interests: ['Management', 'Data Analysis'],
      },
      {
        id: uuidv4(),
        expertise: ['Web Development', 'Database Management'],
        interests: ['Project Management', 'Public Speaking'],
      },
      {
        id: uuidv4(),
        expertise: ['Cloud Computing', 'DevOps'],
        interests: ['Startup Growth', 'Investing'],
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('defaultTable', null, {});
  }
};
