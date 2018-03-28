/** Load environment */
let config;
if (process.env.NODE_ENV === "development") {
  config = require("dotenv").config(__dirname, ".env.dev");
} else {
  config = require("dotenv").config(__dirname, ".env");
}

export default config;
