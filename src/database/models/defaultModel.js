import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  expertise: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
  },
}, {
  timestamps: true,
  tableName: 'defaultTable',
});

export default UserProfile;