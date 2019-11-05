import { Model, DataTypes } from "sequelize";
import Database from "../database";

class User extends Model {
  public id: number;

  public username: string;
  public password: string;

  public canEdit: boolean;
  public canUpload: boolean;

  public static load() {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        canEdit: {
          type: DataTypes.BOOLEAN
        },
        canUpload: {
          type: DataTypes.BOOLEAN
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "users"
      }
    );
  }
}

export default User;