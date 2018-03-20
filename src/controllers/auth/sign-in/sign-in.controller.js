import * as userDao from "../../../dao/user.dao";
import * as tokenDao from "../../../dao/access-token.dao";
import { validationResult } from "express-validator/check";
import { generateToken } from "../../../utils/jwt.util";

export function signInUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  userDao.signinUser(req.body).then(user => {
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    const newModel = { userId: user.id, email: user.email };
    generateToken(newModel).then(token => {
      tokenDao.saveToken(Object.assign({}, newModel, { accessToken: token }))
        .then(() => {
          res.json(token);
        });
      
    });
  });
}

export function checkValidity(req, res, next) {}
