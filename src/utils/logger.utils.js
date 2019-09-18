import winston from "winston";

const logger = new winston.Logger({
  level: "info",
  transports: [
    new winston.transports.File({
      filename: "./logs/server.log",
      timestamp: true
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    winston.transports.Console
  );
  logger.cli();
}

export default logger;
