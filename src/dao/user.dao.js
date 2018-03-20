import { compareHash } from "../utils/bcrypter.util";
import db from "../db/models/index.model";
import Promise from "bluebird";

export function createUser(model) {
  try {
    const user = db.user.build(model);
    return user.save();
  } catch (ex) {
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
            console.log("Error came");
            reject(new Error(`User was not found with email: ${model.email}`));
          }
        }).catch(err => console.log(err))
      });
    }
  });
}
