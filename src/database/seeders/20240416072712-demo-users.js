'use strict';
import { hashPassword } from '../../utils/password.utils';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
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
        id: uuidv4(),
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
