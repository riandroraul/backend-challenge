import { DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db_connection";

interface MaterialAttributes {
  material_id: number;
  material_name: string | null;

  createAt?: Date;
  updateAt?: Date;
}

export interface MaterialInput
  extends Optional<MaterialAttributes, "material_id"> {}
export interface MaterialOutput extends Required<MaterialAttributes> {}

class Material
  extends Model<MaterialAttributes, MaterialInput>
  implements MaterialAttributes
{
  public material_id!: number;
  public material_name!: string;

  public createAt!: Date;
  public updateAt!: Date;
}

Material.init(
  {
    material_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    material_name: {
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

export default Material;
