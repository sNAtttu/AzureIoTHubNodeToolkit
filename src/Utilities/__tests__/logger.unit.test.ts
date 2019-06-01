import { Logger } from "winston";
import LoggerFactory from "../logger";

describe("LoggerFactory", () => {
  let logger: Logger;
  const loggerLevel = "silly";
  beforeEach(() => {
    const moduleName = "device";
    logger = LoggerFactory.createLogger(moduleName, loggerLevel);
  });
  it("should create a logger", () => {
    expect(logger.level).toEqual(loggerLevel);
  });

  it("should log error if there is one", () => {
    const errorLogSpy = jest.spyOn(logger, "error");
    LoggerFactory.handleErrorLogging(new Error("foobar"), logger);
    expect(errorLogSpy).toBeCalled();
  });
});
