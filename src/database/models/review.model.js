import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import Project from "./project.model";
import Enrollment from "./enrollement.model";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  enrollmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Enrollment,
      key: "id",
      unique: true, // One review per enrollment
    },
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: "id",
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hoursSpent: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  completionStatus: {
    type: DataTypes.ENUM("completed", "partially_completed", "dropped"),
    allowNull: false,
    defaultValue: "completed",
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: true,
  tableName: "reviews",
});

export default Review;