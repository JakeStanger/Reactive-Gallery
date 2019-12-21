import { Sequelize, Dialect } from "sequelize";
import config from "../config.json"

class Database {
  private static _instance: Database;

  private _db: Sequelize;

  public static get() {
    if (Database._instance) return Database._instance;
    else {
      const instance = new Database();
      Database._instance = instance;
      return instance;
    }
  }

  public static getConnection() {
    return Database.get()._db;
  }

  public async init() {
    const settings = config.database;
    const db = new Sequelize(settings.database, settings.username, settings.password, {
      host: settings.host,
      dialect: /*settings.dialect as Dialect*/"mariadb",
      dialectOptions: {
        timezone: 'Etc/GMT0'
      },
      define: {
        timestamps: false,
        underscored: true
      }
    });

    await new Promise((resolve, reject) => {
      db.authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
          this._db = db;
          resolve();
        })
        .catch(err => {
          console.error("Unable to connect to the database:", err);
          reject();
          process.exit(1);
        });
    });
  }
}

export default Database;
