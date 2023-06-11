import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Post from './postModel'; 
import User from './userModel'; 
import Community from './commuintyModel';

export interface CommentAttributes {
  id: string;
  comment: string;
  like: string[];
  userId: string;
  postId: string;
  communityId: string | null;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  id!: string;
  comment!: string;
  like!: string[];
  userId!: string;
  postId!: string;
  communityId!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.UUID,
      references: {
        model: Post,
        key: 'id',
      },
    },
    communityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Community,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  }
);

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

export default Comment;
