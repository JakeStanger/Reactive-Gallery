import { Model, DataTypes } from "sequelize";
import Database from "../index";

class PriceGroup extends Model {
  public id: number;
  public name: string;
  public description: string;
  public ratioWidth: number;
  public ratioHeight: number;

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
        },
        description: DataTypes.TEXT,
        ratioWidth: DataTypes.SMALLINT,
        ratioHeight: DataTypes.SMALLINT
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
