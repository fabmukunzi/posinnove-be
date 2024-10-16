import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userCoverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type:DataTypes.STRING,
    defaultValue: 'learner',   
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  verified:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  institution:{
    type: DataTypes.STRING,
    allowNull: true,

  },
  country:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  About:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userBio:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone:{
    type:DataTypes.STRING,
    allowNull: true,
  
  }

}, {
  timestamps: true,
  tableName: 'users',
});

export default User;
