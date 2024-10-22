import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import User from "./user.model";
import ChatRoom from "./chatRoom.model";

const ChatParticipant = sequelize.define("ChatParticipant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatRoomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ChatRoom,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  role: {
    type: DataTypes.ENUM("admin", "moderator", "member"),
    allowNull: false,
    defaultValue: "member",
  },
  lastRead: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  isMuted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  muteUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  blockedUntil: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: "chat_participants",
});

export default ChatParticipant;