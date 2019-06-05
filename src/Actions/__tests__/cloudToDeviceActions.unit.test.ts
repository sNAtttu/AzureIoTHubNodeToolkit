import LoggerFactory from "../../Utilities/logger";
import { cloudToDeviceMessageHandler } from "../cloudToDeviceActions";

interface IMockedLogger {
  silly: jest.Mock;
  debug: jest.Mock;
  info: jest.Mock;
  warn: jest.Mock;
  error: jest.Mock;
}

describe("Cloud to device actions", () => {
  let mockedLogger: IMockedLogger;
  beforeEach(() => {
    mockedLogger = {
      silly: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    LoggerFactory.createLogger = jest.fn().mockReturnValue(mockedLogger);
  });
  it("should handle message which has action described", () => {
    const cloudToDeviceMessagePayload = { action: "stop" };
    cloudToDeviceMessageHandler(cloudToDeviceMessagePayload);
    expect(mockedLogger.info).toBeCalled();
  });

  it("should handle message which has unknown action described", () => {
    const cloudToDeviceMessagePayload = { action: "perse" };
    cloudToDeviceMessageHandler(cloudToDeviceMessagePayload);
    expect(mockedLogger.warn).toBeCalled();
  });
});
