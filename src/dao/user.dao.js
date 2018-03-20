import { compareHash } from "../utils/bcrypter.util";
import db from "../db/models/index.model";
import winston from "../utils/logger.utils";
import Promise from "bluebird";

export function createUser(model) {
  try {
    const user = db.user.build(model);
    return user.save();
  } catch (ex) {
    winston.log("Error occurred while creating user");
  }
}

export async function signinUser(model) {
  const user = await db.User.findOne({ where: { email: model.email } }).catch(
    err => console.log("Some error occurred", err)
  );
  if (!user) {
    throw new Error("Can't retrieve user");
  } else {
    const isCompareSuccess = await compareHash(
      model.password,
      user.passwordHash
    );
    if (isCompareSuccess) {
      return user;
    } else {
      return new Error({ Invalid_Password: "User provided invalid password" });
    }
  }
}
