import { promisifyAll } from "bluebird";
import * as jwtSync from "jsonwebtoken";

export const jwt = promisifyAll(jwtSync);

const appConfig = require("../../config/appConfig.json");
const cert = appConfig.appKey;


export function generateToken(model) {
  return jwt.signAsync(model, cert, { expiresIn: "1h" });
}

export function validateToken(accessToken) {
  return jwt.verifyAsync(accessToken, cert);
}
