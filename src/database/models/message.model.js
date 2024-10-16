import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import ChatRoom from "./chatRoom.model";
import ChatParticipant from "./chatParticipant.model";
import Channel from "./channel.model";

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ChatParticipant,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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
  channelId: {
    type: DataTypes.UUID,
    allowNull: true, // For channel messages
    references: {
      model: Channel,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  parentMessageId: {
    type: DataTypes.UUID,
    allowNull: true, // For replies
    references: {
      model: "Message", // Self-referencing
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  messageType: {
    type: DataTypes.ENUM("text", "image", "file"),
    allowNull: false,
    defaultValue: "text",
  },
  attachments: {
    type: DataTypes.JSONB,
    allowNull: true, // For storing additional data
  },
  status: {
    type: DataTypes.ENUM("sent", "delivered", "read"),
    allowNull: false,
    defaultValue: "sent",
  },
}, {
  timestamps: true,
  tableName: "messages",
});

export default Message;