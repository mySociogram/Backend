import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './userModel';

export interface CommunityAttributes {
    id:string;
    userId:string;
    walletId:string;
    communityName: string;
    about:string;
    users:string[];
}

class Community extends Model<CommunityAttributes> {
    id!:string;
    userId!:string;
    walletId!:string;
    communityName!: string;
    about!:string;
    users!:string[];
    createdAt: any;
    updatedAt: any;
  }

  Community.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
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
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      users: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
        },
  },
  {
    sequelize,
    modelName: 'Community',
    timestamps: true,
  })

  export default Community