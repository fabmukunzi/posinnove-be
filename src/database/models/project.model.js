import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); 

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Project = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDescription: {
    type: DataTypes.STRING,
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
  maxAttendences: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'projects',
});

export default Project;