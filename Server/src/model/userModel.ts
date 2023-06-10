import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface UserAttributes {
  id: string;
  walletId: string;
}

class User extends Model<UserAttributes> {
  id!: string;
  walletId!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    walletId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);

export default User;
