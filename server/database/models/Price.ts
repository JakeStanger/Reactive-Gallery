import { Model, DataTypes } from "sequelize";
import Database from "../index";

class Price extends Model {
  public id: number;
  public name: string;

  public unframed: number;
  public framed: number;
  public postage: number;

  public price_group_id: number;

  public static load() {
    Price.init(
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
        unframed: {
          type: DataTypes.FLOAT
        },
        framed: {
          type: DataTypes.FLOAT,
        },
        postage: {
          type: DataTypes.FLOAT
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "price"
      }
    );
  }

  public static async getFromObject(group: any): Promise<Price> {
    return await Price.findOne({
      where: { id: group.id }
    });
  }
}

export default Price;
