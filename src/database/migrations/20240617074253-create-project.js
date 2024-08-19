'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectCategoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'project_categories',
          key: 'id',
        },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectContent: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      uploads: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      author: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
        
      },
      maxAttendances: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      level: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Advanced'),
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  },
};
