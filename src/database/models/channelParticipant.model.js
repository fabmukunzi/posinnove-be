import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config";
import Channel from "./channel.model";
import ChatParticipant from "./chatParticipant.model";

const ChannelParticipant = sequelize.define("ChannelParticipant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatParticipantId: {
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
    allowNull: false,
    references: {
      model: Channel,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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
  tableName: "channel_participants",
});

export default ChannelParticipant;