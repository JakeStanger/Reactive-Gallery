import { Model, DataTypes } from "sequelize";
import Database from "../database";

class PriceGroup extends Model {
  public id: number;
  public name: string;

  public static load() {
    PriceGroup.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "price_group"
      }
    );
  }

  public static async getFromObject(group: any): Promise<PriceGroup> {
    return await PriceGroup.findOne({
      where: { id: group.id }
    });
  }
}

export default PriceGroup;
