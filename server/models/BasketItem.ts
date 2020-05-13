import {
  Model,
  DataTypes,
  BelongsToSetAssociationMixin,
} from "sequelize";
import Database from "../database";
import Image from "./Image";
import User from "./User";
import Price from "./Price";

class BasketItem extends Model {
  public id: number;
  public quantity: number;
  public framed: boolean;

  public image: Image;
  public user: User;
  public price: Price;

  public setImage!: BelongsToSetAssociationMixin<Image, "image">;
  public setUser!: BelongsToSetAssociationMixin<User, "user">;
  public setPrice!: BelongsToSetAssociationMixin<Price, "price">;

  public static load() {
    BasketItem.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        quantity: DataTypes.INTEGER,
        framed: DataTypes.BOOLEAN
      },
      {
        sequelize: Database.getConnection(),
        tableName: "basket_item"
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
