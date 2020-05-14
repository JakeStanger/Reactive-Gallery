import { Model, DataTypes } from "sequelize";
import Database from "../index";
import Image from "./Image";

class Location extends Model {
  public id: number;
  public name: string;

  public images?: Image[];

  public static load() {
    Location.init(
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
        tableName: "locations"
      }
    );
  }

  public static async getFromObject(location: any): Promise<Location> {
    return await Location.findOrCreate({
      where: { name: location.name }
    }).then(([location]) => location);
  }
}

export default Location;
