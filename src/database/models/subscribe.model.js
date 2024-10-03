import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';


const Subscribe = sequelize.define('Subscribe', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  names:{
  type: DataTypes.STRING,
  allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,

  },
 
}, {
  timestamps: true,
  tableName: 'subscribers',
});

export default Subscribe;