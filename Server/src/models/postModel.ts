import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./userModel";

export interface Like {
  id: string;
  userId: string;
  commentId: string;
}

export interface Flag {
  id: string;
  userId: string;
  colours: { red: number; yellow: number };
}

export interface PostAttributes {
  id?: string;
  title: string;
  userId: string;
  body: string;
  images: Array<{ caption: string; url: string }>;
  communityId: string;
  likes: Like[];
  comments: string[];
  flags: Flag[];
}

class Post extends Model<PostAttributes> {
  id!: string;
  title!: string;
  userId!: string;
  body!: string;
  images!: Array<{ caption: string; url: string }>;
  likes!: Like[];
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.literal("uuid_generate_v4()"),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    communityId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    flags: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true,
  }
);

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

export default Post;
