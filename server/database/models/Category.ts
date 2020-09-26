import { DataTypes, Model } from "sequelize";
import Image from "./Image";
import Database from "../index";

class Category extends Model {
  public id: number;

  public name: string;

  public images?: Image[];

  public static load() {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(128),
          unique: true
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "categories"
      }
    );
  }

  public static async getFromArray(categories: any[]) {
    return await Promise.all(
      categories.map(
        (categoryData: Category) =>
          new Promise<Category>(resolve => {
            Category.findOrCreate({
              where: { name: categoryData.name }
            }).then(([category]) => resolve(category));
          })
      )
    );
  }
}

export default Category;
