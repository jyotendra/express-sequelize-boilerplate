import "babel-polyfill";
import Express from "express";
import * as bodyParser from "body-parser";
// import db from "./db/models/index.model";
import routes from "./routes/index.route";
import Logger from "./utils/logger.utils";

// console.log(config);

const port = 3000;

const app = Express();
export const logger = Logger;

// (() => db.sync({ force: false }))();

app.use(bodyParser.json());
app.use("/", routes);

app.listen(port, () => {
  logger.info(`App is running on port: ${port}`);
});

process.on("exit", () => {
  const date = new Date();
  logger.info(`App closed on: ${date.toUTCString()}`);
});

process.on("SIGINT", () => {
  const date = new Date();
  logger.info(`App closed by user on: ${date.toUTCString()}`);
});

process.on("uncaughtException", err => {
  const date = new Date();
  logger.error(`App crashed on: ${date.toUTCString()}`, err);
});

process.on("unhandledRejection", err => {
  const date = new Date();
  logger.error(`App crashed on: ${date.toUTCString()}`, err);
  process.exit();
});
