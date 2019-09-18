import { signinUser as signIn } from "../../dao/user/sign-in-user.dao";
import { saveToken } from "../../dao/access-token/save-token.dao";
import { validationResult } from "express-validator/check";
import { generateToken } from "../../utils/jwt.util";
import { logger } from "../../server";
import { rConditioner } from "../../utils/conditioner.util";

export async function signInUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return rConditioner(
      res,
      null,
      402,
      "failed",
      "Validation failed",
      errors.mapped()
    );
  }

  const user = await signIn(req.body).catch(err => {
    logger.log(err.message);
  });

  if (!user) {
    return rConditioner(
      res,
      null,
      400,
      "failed",
      "Either email or password is incorrect",
      "User not found"
    );
  }
  const newModel = { userId: user.id, email: user.email };
  const token = await generateToken(newModel).catch(err => {
    logger.error(err);
  });

  if (!token) {
    return rConditioner(
      res,
      null,
      500,
      "failed",
      "Unable to create token",
      "Error occurred while generating token"
    );
  }

  await saveToken(Object.assign({}, newModel, { accessToken: token })).catch(
    () => {
      logger.error("unable to save token");
      return res.json({ err: "some error occurred" });
    }
  );
  return rConditioner(res, {"access-token": token}, 200, "ok", "sign in successfully", null);
}

export function checkValidity(req, res, next) {}
