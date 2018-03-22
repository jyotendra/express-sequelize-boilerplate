import { check } from "express-validator/check";
import * as _ from "lodash";

const signupValidatorsObj = {
  email: check("email")
    .exists()
    .isEmail()
    .withMessage("Email is invalid"),

  password: check("password")
    .exists()
    .isLength({ min: 3, max: 10 })
    .withMessage("password should not be greater than 10 chars or lesser than 3 characters")
};

export const signupValidator = _.values(signupValidatorsObj);