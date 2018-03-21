import * as userDao from "../../dao/user.dao";
import * as tokenDao from "../../dao/access-token.dao";
import { validationResult } from "express-validator/check";
import { generateToken } from "../../utils/jwt.util";
import { authError } from "../../consts/templates/controller/auth-errors.template";
import { logger } from "../../server";

export async function signInUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const user = await userDao.signinUser(req.body).catch(err => {
    logger.log(err.message);
  });

  if (!user) {
    return res.status(400).json({
      error: "User not found"
    });
  }
  const newModel = { userId: user.id, email: user.email };
  const token = await generateToken(newModel).catch(err => {
    logger.error(authError.UNABLE_TO_GENERATE_TOKEN, err);
  });

  if (!token) {
    return res.status(400).json({
      error: "Error while generating token"
    });
  }

  await tokenDao
    .saveToken(Object.assign({}, newModel, { accessToken: token }))
    .catch(() => {
      logger.error(authError.UNABLE_TO_SAVE_TOKEN_IN_SYSTEM);
      return res.json({ err: "some error occurred" });
    });
  return res.json(token);
}

export function checkValidity(req, res, next) {}
