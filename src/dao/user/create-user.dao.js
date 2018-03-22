import { compareHash } from "../../utils/bcrypter.util";
import db from "../../db/models/index.model";
import { logger } from "../../server";
import { userError } from "./user.template";

export function createUser(model) {
  try {
    const user = db.user.build(model);
    return user.save();
  } catch (ex) {
    logger.log("Error occurred while creating user");
  }
}