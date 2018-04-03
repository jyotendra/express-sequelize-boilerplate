import { getHash } from "../../utils/bcrypter.util";
import db from "../../db/models/index.model";
import { logger } from "../../server";
import { userError } from "./user.template";
import { Op } from "sequelize";

export async function createUser(model) {
  try {
    return db.sequelize.transaction(async transaction => {
      const hashedPass = await getHash(model.password);
      const user = await db.user
        .create(
          {
            email: model.email,
            passwordHash: hashedPass,
            isActive: false
          },
          { transaction }
        )
        .catch(err => {
          logger.error(userError.UNABLE_TO_SIGNUP_USER(model), { err });
          if (err.name === "SequelizeUniqueConstraintError") {
            throw {
              type: "USER_ALREADY_EXISTS",
              error: err
            };
          }
        });

      const accessToken = await getHash(
        `${user.email}67U*Ubbjh78*(*(&Uhikjnk|${user.id}`
      );

      const verificationModel = await db.userVerification
        .create(
          {
            userId: user.id,
            accessToken
          },
          { transaction }
        )
        .catch(error =>
          logger.error(userError.UNABLE_TO_SAVE_IN_VERIFICATION(user), {
            error
          })
        );

      return { user, verificationModel };
    });
  } catch (ex) {
    logger.error("Error occurred while saving model: ", model);
  }
}

/**
 * Activates a user that has signed up previously
 */

export async function activateUser(token) {
  try {
    return db.sequelize.transaction(async transaction => {
      const tokenExists = await db.userVerification.find(
        {
          where: {
            accessToken: token
          }
        },
        { transaction }
      );

      if (tokenExists) {
        const activatedUser = await db.user.find(
          {
            where: {
              id: tokenExists.userId
            }
          },
          { transaction }
        );
        if (activatedUser.isActive) {
          throw {
            type: "USER_ALREADY_VERIFIED",
            error: new Error(userError.USER_ALREADY_VERIFIED)
          };
        } else {
          activatedUser.isActive = true;
          await activatedUser
            .save({ transaction })
            .catch(error =>
              logger.error(userError.UNABLE_TO_ACTIVATE_USER(error))
            );
        }
      } else {
        throw {
          type: "INVALID_ACCESS_TOKEN",
          error: new Error(userError.INVALID_ACCESS_TOKEN)
        };
      }

      return tokenExists;
    });
  } catch (error) {
    logger.error(userError.UNABLE_TO_ACTIVATE_USER(token), { error });
  }
}
