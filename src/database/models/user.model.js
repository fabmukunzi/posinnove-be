import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); 

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

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
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type:DataTypes.STRING,
    defaultValue: 'student',   
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
  }

}, {
  timestamps: true,
  tableName: 'users',
});

export default User;
