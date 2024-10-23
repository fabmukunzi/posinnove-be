import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';
import User from './user.model';

const Expertise = sequelize.define('Expertise', {
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
  expertiseNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'expertises',
});

export default Expertise;
