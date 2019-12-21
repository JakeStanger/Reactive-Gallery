import { Model, DataTypes } from "sequelize";
import Database from "../database";
import Location from "./Location";
import Tag from "./Tag";
import { BelongsToSetAssociationMixin, BelongsToManySetAssociationsMixin } from "sequelize";
import Price from "./Price";
import PriceGroup from "./PriceGroup";

class Image extends Model {
  public id: number;

  public name: string;
  public description: string;
  public filename: string;

  public width: number;
  public height: number;

  public exposure: number;
  public focalLength: number;
  public aperture: number;
  public iso: number;
  public cameraModel: string;
  public timeTaken: Date;
  public deleted: boolean;

  public setLocation!: BelongsToSetAssociationMixin<Location, "location">;
  public setTags!: BelongsToManySetAssociationsMixin<Tag, "tags">;
  public setPriceGroup: BelongsToSetAssociationMixin<Price, "priceGroup">;

  public readonly location?: Location;
  public readonly tags?: Tag[];
  public readonly priceGroup: PriceGroup;

  public static load() {
    Image.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT
        },
        filename: {
          type: DataTypes.STRING(128)
        },
        width: {
          type: DataTypes.INTEGER
        },
        height: {
          type: DataTypes.INTEGER
        },
        exposure: {
          type: DataTypes.FLOAT
        },
        focalLength: {
          type: DataTypes.INTEGER
        },
        aperture: {
          type: DataTypes.INTEGER
        },
        iso: {
          type: DataTypes.INTEGER
        },
        cameraModel: {
          type: DataTypes.STRING(32)
        },
        timeTaken: {
          type: DataTypes.DATE,
          field: "taken_time"
        },
        deleted: {
          type: DataTypes.BOOLEAN
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "images"
      }
    );
  }
}

export default Image;
