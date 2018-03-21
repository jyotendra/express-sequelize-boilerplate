import * as userDao from "../../dao/user.dao";
import * as tokenDao from "../../dao/access-token.dao";
import winston from "../../utils/logger.utils";
import { validationResult } from "express-validator/check";
import { generateToken } from "../../utils/jwt.util";

export async function signInUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const user = await userDao.signinUser(req.body).catch(err => {
    console.log(err.message);
  });

  if (!user) {
    return res.status(400).json({
      error: "User not found"
    });
  }
  const newModel = { userId: user.id, email: user.email };
  const token = await generateToken(newModel).catch(() => {
    console.log("Token couldn't be generated");
  });

  if (!token) {
    return res.status(400).json({
      error: "Error while generating token"
    });
  }

  await tokenDao
    .saveToken(Object.assign({}, newModel, { accessToken: token }))
    .catch(() => {
      return res.json({ err: "some error occurred" });
    });
  winston.info(`Thats the token - ${token}`);
  return res.json(token);
}

export function checkValidity(req, res, next) {}
