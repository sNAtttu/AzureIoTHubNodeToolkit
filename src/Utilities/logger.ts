import { createLogger, format, Logger, transports } from "winston";

export default class LoggerFactory {
  public static createLogger(moduleName: string): Logger {
    return createLogger({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.label({ label: moduleName }),
      ),
      transports: new transports.Console(),
    });
  }
}
