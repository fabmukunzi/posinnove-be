import { Sequelize,DataTypes } from "sequelize";

import dotenv from "dotenv";

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL,{
    dialect: "postgres",
    logging: false,
})

const Assements = sequelize.define(
    "assements",{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        chaptersId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: chapters,
                key: "id"
            }
        },
        courseId:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: courses,
                key: "id"
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        assessmentType:{
            type: DataTypes.ENUM('quiz', 'assignment', 'exam'),
            allowNull: false,
        },
        contents:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true, 
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
          {
            timestamps: true,
            tableName: "assements",
          }
)

export default Assesments