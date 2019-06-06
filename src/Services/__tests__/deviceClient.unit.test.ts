import { Client, Message } from "azure-iot-device";
import LoggerFactory from "../../Utilities/logger";
import DeviceClient from "../deviceClient";

jest.mock("azure-iot-device");

interface IMockedLogger {
  silly: jest.Mock;
  debug: jest.Mock;
  info: jest.Mock;
  warn: jest.Mock;
  error: jest.Mock;
}

function createMockedLogger(): IMockedLogger {
  return {
    silly: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}

describe("Device client wrapper", () => {
  let deviceClient: DeviceClient;
  let handleErrorLoggingMock: jest.Mock;
  let mockedLogger: IMockedLogger;

  beforeEach(() => {
    mockedLogger = createMockedLogger();
    LoggerFactory.createLogger = jest.fn().mockReturnValue(mockedLogger);
    deviceClient = new DeviceClient(Client.fromConnectionString("foobar", {}));
    handleErrorLoggingMock = jest.fn();
    LoggerFactory.handleErrorLogging = handleErrorLoggingMock;
  });

  it("should open connection to the iot hub and execute callback", () => {
    const openConnectionCallback = jest.fn();
    deviceClient.openConnectionToIotHub(openConnectionCallback);
    expect(openConnectionCallback).toBeCalled();
  });

  it("should open connection to the iot hub without callback", () => {
    deviceClient.openConnectionToIotHub();
    expect(handleErrorLoggingMock).toBeCalled();
  });

  it("should send a message to the iot hub", () => {
    const testData = { foo: "bar" };
    deviceClient.sendMessageToIotHub(testData);
    expect(handleErrorLoggingMock).toBeCalled();
  });

  it("should register handler for the message event", () => {
    const handler = jest.fn();
    const testHandler = "testListener";
    deviceClient.registerListenerForMessages(testHandler, handler);
    deviceClient.registeredListeners.get(testHandler)();
    expect(handler).toBeCalled();
  });

  it("should register error listener", () => {
    deviceClient.registerErrorListener();
    deviceClient.emitMessageFromDeviceClient("error", new Error("test"));
    expect(handleErrorLoggingMock).toBeCalled();
  });

  it("should complete a message", () => {
    const testMessage: Message = new Message(JSON.stringify("test"));
    deviceClient.completeMessage(testMessage);
    expect(mockedLogger.info).toBeCalledWith("Message completed");
  });

  it("should log error if there's one when completing a message", () => {
    const testMessage: Message = new Message("h4x");
    deviceClient.completeMessage(testMessage);
    expect(mockedLogger.error).toBeCalled();
  });

  it("should reject a message", () => {
    const testMessage: Message = new Message(JSON.stringify("test"));
    deviceClient.rejectMessage(testMessage);
    expect(mockedLogger.info).toBeCalledWith("Message rejected");
  });

  it("should log error if there's one when rejecting a message", () => {
    const testMessage: Message = new Message("h4x");
    deviceClient.rejectMessage(testMessage);
    expect(mockedLogger.error).toBeCalled();
  });
});
