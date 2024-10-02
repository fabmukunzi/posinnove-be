import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';
import Enrollment from './enrollement.model';
import Task from './task.model';


const enrollmentTask = sequelize.define('enrollmentTask', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
  taskId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Task,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'review_pending', 'completed'),
    defaultValue: 'not_started',
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  submissionContent: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startedAt: {
    type: DataTypes.DATE,
  },
  completedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'enrollment_tasks',
});

export default enrollmentTask;