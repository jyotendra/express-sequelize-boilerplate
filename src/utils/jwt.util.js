import { promisifyAll } from "bluebird";
import * as jwtSync from "jsonwebtoken";

export const jwt = promisifyAll(jwtSync);

const cert = process.env.APP_KEY;


export function generateToken(model) {
  return jwt.signAsync(model, cert, { expiresIn: "1h" });
}

export function validateToken(accessToken) {
  return jwt.verifyAsync(accessToken, cert);
}
