import { Sequelize, Dialect } from "sequelize";

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
    const settings = process.env;
    const db = new Sequelize(settings.DATABASE_NAME, settings.DATABASE_USER, settings.DATABASE_PASSWORD, {
      host: settings.DATABASE_HOST,
      dialect: settings.DATABASE_DIALIECT as Dialect,
      dialectOptions: {
        timezone: 'Etc/GMT0'
      },
      define: {
        timestamps: false,
        underscored: true
      },
      logging: false
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
