import { Sequelize, DataTypes } from 'sequelize';
import Project from './project.model';


const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});


const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taskContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true,
  tableName: 'tasks',
});

export default Task;