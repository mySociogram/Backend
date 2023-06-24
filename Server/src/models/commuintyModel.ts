import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './userModel';

export interface CommunityAttributes {
  id: string;
  userId: string;
  walletId: string;
  communityName: string;
  about: string;
  users: string[];
  token: number;
}

class Community extends Model<CommunityAttributes> {
  id!: string;
  userId!: string;
  walletId!: string;
  communityName!: string;
  about!: string;
  users!: string[];
  token!: number; // Add the token attribute
  createdAt!: Date;
  updatedAt!: Date;
}

Community.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    walletId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    communityName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
    },
    token: {
      type: DataTypes.INTEGER, // Add the token attribute as INTEGER
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Community',
    timestamps: true,
  }
);

export default Community;
