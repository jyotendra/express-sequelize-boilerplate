import { check } from "express-validator";
import * as _ from "lodash";

const signinValidatorsObj = {
  email: check("email")
    .exists()
    .isEmail()
    .withMessage("Email is invalid"),

  password: check("password")
    .exists()
    .isLength({ min: 3, max: 10 })
    .withMessage("password should not be greater than 10 chars or lesser than 3 characters")
};

export const signinValidator = _.values(signinValidatorsObj);