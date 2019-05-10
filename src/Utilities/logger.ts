import { createLogger, format, Logger, transports } from "winston";

export default class LoggerFactory {
  public static createLogger(moduleName: string, loggerLevel?: string): Logger {
    return createLogger({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.label({ label: moduleName }),
      ),
      level: loggerLevel || "info",
      transports: new transports.Console(),
    });
  }

  public static handleErrorLogging(error: Error | undefined, logger: Logger) {
    if (error) {
      logger.error(error);
    }
  }

}
