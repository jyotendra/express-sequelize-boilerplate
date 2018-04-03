import {resolve} from "path";
/** Load environment */
let config;
if (process.env.NODE_ENV === "development") {
  config = require("dotenv").config({path: resolve(__dirname, "../../.env.dev")});
} else {
  config = require("dotenv").config({path: resolve(__dirname, "../../.env")});
}

export default config;
