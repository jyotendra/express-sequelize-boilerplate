import { Model, ArrayModel } from "objectmodel";
import { logger } from "../server";

const responseModel = Model({
  result: [Object, undefined, null],
  code: Number,
  status: ["failed", "ok"],
  messages: [ArrayModel(String), String, undefined, null],
  errors: [ArrayModel([Object, String]), Object, String, undefined, null]
});

/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {Number} code
 * @param {string} resStatus
 * @param {string[] | string} messages
 * @param {string[] | string | Object} errors
 */
export function rConditioner(res, result, code, resStatus, messages, errors) {
  try {
    const response = new responseModel({
      result: result,
      code: code,
      status: resStatus,
      messages: messages,
      errors: errors
    });
    return res.status(code).json(response);
  } catch (err) {
    logger.error("Improper data given to format result", err);
    return res
      .status(500)
      .json({ error: "unknown error from response conditioner" });
  }
}
