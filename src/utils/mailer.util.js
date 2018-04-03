import nodemailer from "nodemailer";
import { logger } from "../server";
import Promise from "bluebird";

class NodeMailer {
  transporter;

  mailConfig;

  constructor() {
    this.mailConfig = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: "true" === process.env.EMAIL_ISSECURED,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    };

    this.transporter = nodemailer.createTransport(this.mailConfig);
  }

  /**
   *
   * @param {Object} options mail options
   *  @param {string} options.from: '"Fred Foo 👻" <foo[at]gmail.com>', // sender address
   *  @param {string} options.to: 'bar[at]gmail.com, baz[at]gmail.com', // list of receivers
   *  @param {string} options.subject: 'Hello ✔', // Subject line
   *  @param {string} options.text: 'Hello world?', // plain text body
   *  @param {string} options.html: '<b>Hello world?</b>' // html body
   */
  sendMail(options) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(options, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    }).catch(error =>
      logger.error("Error occurred while sending message", { error })
    );
  }

  /**
   *
   * @param {Object} config
   * @param {string} config.host smtp host for mail
   * @param {number} config.port smtp host port
   * @param {boolean} config.secure is host secured
   * @param {Object} config.auth
   * @param {string} config.auth.user username
   * @param {string} config.auth.pass username
   */
  setMailConfig(config) {
    this.mailConfig = config;
  }
}



const mailer = new NodeMailer();
export default mailer;

/**
 * Example of sending mail
 * mailer.sendMail({
  from: "Jyotendra 👻 '<jyotendras@neuronsolutions.com>'",
  to: "gajendrap@neuronsolutions.com, paridhik@neuronsolutions.com",
  subject: "Just Testing",
  text: "Testing mail for delivery",
  html: "<b>You got the mail, yay!!</b>"
});
 */
