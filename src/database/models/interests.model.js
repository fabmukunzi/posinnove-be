import { Sequelize, DataTypes } from 'sequelize';
import User from './user.model';


const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});


const Interest = sequelize.define('Interest', {
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
  interestNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull:true,

  }
}, {
  timestamps: true,
  tableName: 'interests',
});

export default Interest;