import { Model, DataTypes } from "sequelize";
import Database from "../database";

class Event extends Model {
  public id: number;
  public name: string;
  public location: string;

  public startTime: Date;
  public endTime: Date;

  public static load() {
    Event.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(255),
        },
        location: {
          type: DataTypes.TEXT,
        },
        startTime: {
          type: DataTypes.DATE
        },
        endTime: {
          type: DataTypes.DATE
        }
      },
      {
        sequelize: Database.getConnection(),
        tableName: "events"
      }
    );
  }

  public static async getFromObject(event: any): Promise<Event> {
    return await Event.findOrCreate({
      where: { id: event.id }
    }).then(([event]) => event);
  }
}

export default Event;
