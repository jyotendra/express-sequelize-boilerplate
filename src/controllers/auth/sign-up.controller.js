import { validationResult } from "express-validator";
import { createUser, activateUser } from "../../dao/user/signup-user.dao";
import { logger } from "../../server";
import { rConditioner } from "../../utils/conditioner.util";
import mailer from "../../utils/mailer.util";

export async function signUpUser(req, res) {
  try {
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

    const createdUser = await createUser(req.body).catch(err => {
      if (err.type === "USER_ALREADY_EXISTS") {
        return rConditioner(
          res,
          null,
          400,
          "failed",
          "User already exists",
          "Unique constraint not matched"
        );
      }
    });
    if (createdUser.user) {
      await mailer
        .sendMail({
          from: process.env.EMAIL_SENDER,
          to: createdUser.user.email,
          subject: "Verify account at express-sequelize",
          text: "Please verify your account at localhost:3000/sign-up/verify",
          html: `<a href="${process.env.APP_URL}/sign-up/verify?accessToken=${
            createdUser.verificationModel.accessToken
          }">Please verify your email</a>`
        })
        .catch(error => {
          logger.error(
            `Unable to send verification email to ${createdUser.email}`
          );
          return rConditioner(
            res,
            null,
            400,
            "failed",
            "Unable to send verification email"
          );
        });

      return rConditioner(
        res,
        { createdUser },
        200,
        "ok",
        "Please verify your email to continue",
        null
      );
    }
  } catch (error) {
    logger.error(`Error occurred while creating user`, { error });
  }
}
