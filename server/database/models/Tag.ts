import { Model, DataTypes } from "sequelize";
import Database from "../index";
import Image from "./Image";

class Tag extends Model {
  public id: number;

  public name: string;

  public images?: Image[];

  public static load() {
    Tag.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(32),
          unique: true
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "tags"
      }
    );
  }

  public static async getFromArray(tags: any[]) {
    return await Promise.all(
      tags.map(
        (tagData: Tag) =>
          new Promise<Tag>(resolve => {
            Tag.findOrCreate({ where: { name: tagData.name } }).then(([tag]) =>
              resolve(tag)
            );
          })
      )
    );
  }
}

export default Tag;
