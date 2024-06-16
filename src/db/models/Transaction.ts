import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db_connection";
import User from "./User";
import Material from "./Material";

interface TransactionAttributes {
  transaction_id: number;
  vendor_id: number;
  customer_id: number;
  material_id: number;
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
  vendor_id!: number;
  customer_id!: number;
  material_id!: number;
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
    vendor_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    material_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
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

Transaction.belongsTo(User, { as: "vendor", foreignKey: "vendor_id" });
Transaction.belongsTo(User, { as: "customer", foreignKey: "customer_id" });
Transaction.belongsTo(Material, { as: "material", foreignKey: "material_id" });

export default Transaction;
