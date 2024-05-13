import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Course from './course.model';

dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const courseCategory = sequelize.define('courseCategory', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  courseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt:{
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt:{
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true,
  tableName: 'course_categories',
});
courseCategory.hasMany(Course, { foreignKey: "categoryId" });
export default courseCategory;
