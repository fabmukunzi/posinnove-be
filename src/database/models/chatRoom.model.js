import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import Project from "./project.model";
import User from "./user.model";

const ChatRoom = sequelize.define("ChatRoom", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("project", "direct", "group", "global"),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true, // Null for direct chat
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  creatorId: {
    type: DataTypes.UUID,
    allowNull: true, // Required for group chat
    references: {
      model: User,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: true, // Only for project chat
    references: {
      model: Project,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
}, {
  timestamps: true,
  tableName: "chat_rooms",
});

export default ChatRoom;