import db from "../../db/models/index.model";
import { Op } from "sequelize";
import { logger } from "../../server";

import { accessTokenErrors } from "./access-token.template";

export async function saveToken(model) {
  const foundToken = await db.accessToken.findAll({
    where: {
      userId: {
        [Op.eq]: model.userId
      }
    }
  }).catch(err => {
    logger.error(accessTokenErrors.TOKEN_FIND_ERROR(model['accessToken']), err)
  });

  if (foundToken) {
    await db.accessToken.destroy({
      where: {
        userId: {
          [Op.eq]: model.userId
        }
      }
    }).catch(err => {
      logger.error(accessTokenErrors.TOKEN_DELETE_ERROR, err);
    });
  } else {
    throw new Error("Can't find token");
  }

  const token = await db.accessToken.build(model);
  return token.save();
}
