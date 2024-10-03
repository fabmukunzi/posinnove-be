import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.config.js';

const projectCategory = sequelize.define('projectCategory', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  projectCategory: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
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
  tableName: 'project_categories',  
});

// projectCategory.hasMany(Project, { foreignKey: "categoryId" });  
export default projectCategory;
