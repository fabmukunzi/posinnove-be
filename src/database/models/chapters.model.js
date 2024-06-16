import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import Course from "../models/course.model"


dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const Chapters = sequelize.define(
  "Chapters",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chaptersImages: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true 
    },
    chaptersThumbnails:{
        type: DataTypes.STRING,
        allowNull: true,
       
      }, 
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
        references: {
          model: 'courses',
          key: 'id',
        },
      },

    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
    
  },
  {
    timestamps: true,
    tableName: "chapters",
  }
);
Chapters.belongsTo(Course, { foreignKey: "courseId" });


export default Chapters;
