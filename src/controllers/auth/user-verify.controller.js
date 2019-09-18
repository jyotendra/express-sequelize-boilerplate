import { activateUser } from "../../dao/user/signup-user.dao";
import { logger } from "../../server";
import { rConditioner } from "../../utils/conditioner.util";

export async function verifyUser(req, res) {
  try {
    const { accessToken } = req.query;
    if (accessToken) {
      const token = await activateUser(accessToken).catch(err => {
        if (err.type === "USER_ALREADY_VERIFIED") {
          return rConditioner(
            res,
            null,
            400,
            "failed",
            "Please log in with password defined during registration",
            "User already verified"
          );
        } else if (err.type === "INVALID_ACCESS_TOKEN") {
          return rConditioner(
            res,
            null,
            400,
            "failed",
            "Invalid access token",
            "Token does not exist"
          );
        }
      });
      if (token.userId) {
        return rConditioner(
          res,
          null,
          200,
          "ok",
          "user verified successfully",
          null
        );
      }
    } else {
      return rConditioner(
        res,
        null,
        400,
        "failed",
        "Inappropriate access token"
      );
    }
  } catch (ex) {
    logger.error("unable to verify user", ex);
  }
}
