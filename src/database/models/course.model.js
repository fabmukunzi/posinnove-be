import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import User from "../models/user.model"; 
import courseCategory from "../models/courseCategory.model"; 

dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Course = sequelize.define('Course', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    tutorId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: User,
            key: "id"
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseThumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: courseCategory,
            key: "id"
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: true,
    tableName: "courses",
  }
);
 
Course.belongsTo(User, { foreignKey: "tutorId" });
  
export default Course;
