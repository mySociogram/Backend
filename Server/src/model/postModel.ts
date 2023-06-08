import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./userModel";

export interface PostAttributes {
  id?: string;
  title: string;
  userId: string;
  body: string;
  images: Array<{ caption: string; url: string }>;
}

class Post extends Model<PostAttributes> {
  id!: string;
  title!: string;
  userId!: string;
  body!: string;
  images!: Array<{ caption: string; url: string }>;

  readonly user?: User; // Optional User instance associated with the post
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.literal('uuid_generate_v4()')
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true,
  }
);

Post.belongsTo(User, { foreignKey: "userId" });

export default Post;
