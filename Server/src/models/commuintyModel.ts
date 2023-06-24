import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './userModel';

export interface UserAttributes {
  userId: string;
  walletId: string;
}

export interface CommunityAttributes {
  id: string;
  userId: string;
  communityName: string;
  about: string;
  users: UserAttributes[];
}

class Community extends Model<CommunityAttributes> {
  public id!: string;
  public userId!: string;
  public communityName!: string;
  public about!: string;
  public users!: UserAttributes[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'Community',
    timestamps: true,
  }
);

export default Community;
