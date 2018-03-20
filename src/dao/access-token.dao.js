import db from "../db/models/index.model";
  import * as Bluebird from "bluebird";
  import { Op } from "sequelize";
  
  export function saveToken(
    model) {
    try {
      return db.AccessToken.findAll({
        where: {
          userId: {
            [Op.eq]: model.userId
          }
        }
      }).then(foundToken => {
        if (foundToken) {
          return db.AccessToken.destroy({
            where: {
              userId: {
                [Op.eq]: model.userId
              }
            }
          })
        } else {
            return Bluebird.resolve(0);
        }
      }).then(() => {
          const token = db.AccessToken.build(model);
          return token.save();
      })
  
    } catch (ex) {
      console.log(ex);
      console.log("Error occurred while saving Access Token");
    }
  }

