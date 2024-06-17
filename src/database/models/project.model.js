import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Project = sequelize.define('projects', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },

  projectCategoryId: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: 'ProjectCategory',
      key: 'id',
    },
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'coverImage',
  },
  projectContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uploads: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  author: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  maxAttendances: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
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
  tableName: 'projects',
});

export default Project;
