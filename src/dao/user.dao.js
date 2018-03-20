import { compareHash } from "../utils/bcrypter.util";
import db from "../db/models/index.model";
import Promise from "bluebird";

export function createUser(model) {
  try {
    const author = db.user.build(model);
    return author.save();
  } catch (ex) {
    console.log("Error occurred while creating user");
  }
}

export function signinUser(model) {
  return db.User.findOne({ where: { email: model.email } }).then((user) => {
    if (!user) {
      return Promise.resolve();
    } else {
      return compareHash(model.password, user.passwordHash).then(val => {
        return new Promise((resolve, reject) => {
          if (val) {
            resolve(user);
          } else {
            reject(null);
          }
        });
      });
    }
  });
}
