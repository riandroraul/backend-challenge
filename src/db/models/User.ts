import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db_connection";

interface UserAttributes {
  user_id: number;
  username: string | null;

  createAt?: Date;
  updateAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "user_id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public user_id!: number;
  public username!: string;

  public createAt!: Date;
  public updateAt!: Date;
}

User.init(
  {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
      validate: {
        isInt: true,
      },
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default User;
