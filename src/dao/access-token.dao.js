import db from "../db/models/index.model";
import Promise from "bluebird";
import { Op } from "sequelize";

export async function saveToken(model) {
  const foundToken = await db.AccessToken.findAll({
    where: {
      userId: {
        [Op.eq]: model.userId
      }
    }
  });
  if (foundToken) {
    await db.AccessToken.destroy({
      where: {
        userId: {
          [Op.eq]: model.userId
        }
      }
    });
  } else {
    throw new Error("Can't find token");
  }
  const token = await db.AccessToken.build(model);
  return token.save();
}
