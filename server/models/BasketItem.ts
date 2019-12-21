import { Model, DataTypes } from "sequelize";
import Database from "../database";
import Image from "./Image";
import User from "./User";

class BasketItem extends Model {
  public id: number;

  public image: Image;
  public user: User;
  public price: BasketItem;
  public quantity: number;

  public static load() {
    BasketItem.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        quantity: DataTypes.INTEGER
      },
      {
        sequelize: Database.getConnection(),
        tableName: "price"
      }
    );
  }

  public static async getFromObject(item: any): Promise<BasketItem> {
    return await BasketItem.findOne({
      where: { id: item.id }
    });
  }
}

export default BasketItem;
