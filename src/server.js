import "babel-polyfill";
import config from "./utils/configImporter.util";
import Express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes/index.route";
import Logger from "./utils/logger.utils";
import allJobs from "./utils/crons.util";


require('source-map-support').install();


const port = 3000;

const app = Express();
export const logger = Logger;

app.use(bodyParser.json());
app.use("/", routes);
app.use(Express.static("./public"));

app.listen(port, () => {
  logger.info(`App is running on port: ${port}`);
});



process.on("exit", () => {
  const date = new Date();
  logger.info(`App closed on: ${date.toUTCString()}`);
  process.exit();
});

process.on("SIGINT", () => {
  const date = new Date();
  logger.info(`App closed by user on: ${date.toUTCString()}`);
  process.exit();
});

process.on("uncaughtException", err => {
  const date = new Date();
  logger.error(`App crashed on: ${date.toUTCString()}`, err);
  process.exit();
});

process.on("unhandledRejection", err => {
  const date = new Date();
  logger.error(`App crashed on: ${date.toUTCString()}`, err);
  process.exit();
});
