import { Sequelize, DataTypes } from 'sequelize';
import User from './user.model';
import Project from './project.model.js';
import ProjectCategory from './projectCategory.model.js';

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Define Enrollment model
const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true,
  tableName: 'enrollments',
});

export default Enrollment;