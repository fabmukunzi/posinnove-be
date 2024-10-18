import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import ChatParticipant from "./chatParticipant.model";
import Channel from "./channel.model";

const BlockLog = sequelize.define("BlockLog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  blockedParticipantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ChatParticipant,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  blockedByParticipantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ChatParticipant,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  channelId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Channel,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  blockedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  duration: {
    type: DataTypes.INTEGER, // In minutes, null for indefinite
    allowNull: true,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  unblockedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  unblockReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: "block_logs",
});

export default BlockLog;