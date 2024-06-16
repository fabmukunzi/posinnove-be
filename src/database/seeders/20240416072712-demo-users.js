'use strict';

const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id:'21a97b56-9dad-4aac-ad42-cd99b3c68109',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'john@example.com',
        profileImage: 'profile.jpg',
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3f1a89a2-23bc-4e57-8cc3-07d14ec67890',
        firstName: "ISHIMWE Ami Paradis",
        lastName: 'Doe',
        username: 'janedoe',
        password: 'password456',
        email: 'jane@example.com',
        profileImage: 'profile.jpg',
        gender: 'male',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
