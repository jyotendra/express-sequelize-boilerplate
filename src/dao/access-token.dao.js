import db from "../db/models/index.model";
import { Op } from "sequelize";
import { logger } from "../server";

import { accessTokenErrors } from "../consts/templates/dao/dao-error.template";

export async function saveToken(model) {
  const foundToken = await db.AccessToken.findAll({
    where: {
      userId: {
        [Op.eq]: model.userId
      }
    }
  }).catch(err => {
    logger.error(accessTokenErrors.TOKEN_FIND_ERROR(model['accessToken']), err)
  });

  if (foundToken) {
    await db.AccessToken.destroy({
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

  const token = await db.AccessToken.build(model);
  return token.save();
}
