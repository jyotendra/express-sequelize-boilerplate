import { compareHash } from "../utils/bcrypter.util";
import db from "../db/models/index.model";
import { logger } from "../server";
import { userError } from "../consts/templates/dao/dao-error.template";

export function createUser(model) {
  try {
    const user = db.user.build(model);
    return user.save();
  } catch (ex) {
    logger.log("Error occurred while creating user");
  }
}

export async function signinUser(model) {
  const user = await db.user.findOne({ where: { email: model.email }, include: [{
    model: db.accessToken
  }] }).catch(
    err => logger.error(userError.UNABLE_TO_FIND_USER(model.email), err)
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
