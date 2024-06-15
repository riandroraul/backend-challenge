import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db_connection";
import User from "./User";

interface TransactionAttributes {
  transaction_id: number;
  vendor: string | null;
  customer: string | null;
  material: string | null;
  transaction_date: Date;

  createAt?: Date;
  updateAt?: Date;
}

export interface TransactionInput
  extends Optional<TransactionAttributes, "transaction_id"> {}
export interface TransactionOutput extends Required<TransactionAttributes> {}

class Transaction
  extends Model<TransactionAttributes, TransactionInput>
  implements TransactionAttributes
{
  public transaction_id!: number;
  public vendor!: string;
  public customer!: string;
  public material!: string;
  public transaction_date!: Date;

  public createAt!: Date;
  public updateAt!: Date;
}

Transaction.init(
  {
    transaction_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    vendor: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    customer: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    material: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    transaction_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

Transaction.belongsTo(User, { foreignKey: "user_id" });

export default Transaction;
