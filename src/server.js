import "babel-polyfill";
import Express from "express";
import * as bodyParser from "body-parser";
// import db from "./db/models/index.model";
import routes from "./routes/index.route";

// console.log(config);

const port = 3000;

const app = Express();

// (() => db.sync({ force: false }))();

app.use(bodyParser.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
