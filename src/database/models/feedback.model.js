import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';
import User from './user.model';
import Enrollment from './enrollement.model';
import enrollmentTask from './enrollmentTask.model.js';

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  mentorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  enrollmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Enrollment,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  enrollmentTaskId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: enrollmentTask,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'feedback',
});

export default Feedback;