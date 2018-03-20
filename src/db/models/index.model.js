import * as fs from "fs";
import * as path from "path";
import { Sequelize } from "sequelize";

const basename = path.basename(module.filename);
const db = {};

const config = require("../../../config/database.json");

const dbConfig = config.development;

export const sequelize = new Sequelize({
  ...dbConfig
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log("Thats mode name", model.name);
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
