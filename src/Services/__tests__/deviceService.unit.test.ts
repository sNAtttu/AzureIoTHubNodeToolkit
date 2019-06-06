import { Message } from "azure-iot-device";
import { createTestDevice } from "../../TestUtilities/device";
import LoggerFactory from "../../Utilities/logger";
import DeviceService from "../deviceService";

jest.mock("../deviceClient");

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

describe("Device service", () => {
  let deviceService: DeviceService;
  let mockedLogger: IMockedLogger;
  const device = createTestDevice();
  const hostName = "IotHub.azure.com";
  beforeEach(() => {
    mockedLogger = createMockedLogger();
    LoggerFactory.createLogger = jest.fn().mockReturnValue(mockedLogger);
    jest.useFakeTimers();
    deviceService = new DeviceService(hostName, device);
  });

  it("should return an empty connection strnig if the device gived is missing information", () => {
    const deviceWithoutSymmetricKey = {
      ...device,
      authentication: {
        symmetricKey: undefined,
      },
    };
    const faultyDeviceService = new DeviceService(
      hostName,
      deviceWithoutSymmetricKey,
    );
    expect(faultyDeviceService.getConnectionString()).toBe("");
  });

  it("should construct connection string for a device using sas authentication", () => {
    const expectedConnectionString = `HostName=${hostName};DeviceId=${
      device.deviceId
    };SharedAccessKey=${device.authentication.symmetricKey.primaryKey}`;
    expect(deviceService.getConnectionString()).toBe(expectedConnectionString);
  });

  it("should start sending data with specified interval", () => {
    const interval = 0.5;
    deviceService.startSendingData(interval);
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(deviceService.deviceEventTimers.length).toBe(1);
    jest.clearAllTimers();
  });

  it("should start monitoring device", () => {
    deviceService.startMonitoringDevice();
    expect(
      deviceService.deviceClient.registeredListeners.get("monitorMessages"),
    ).toBeTruthy();
  });

  it("should complete messages which are valid", () => {
    const completeSpy = jest.spyOn(
      deviceService.deviceClient,
      "completeMessage",
    );
    const message: Message = new Message(JSON.stringify({ action: "stop" }));
    deviceService.monitorMessages(message);
    expect(completeSpy).toBeCalled();
  });

  // it("should reject messages which are not valid", () => {
  //   const rejectSpy = jest.spyOn(deviceService.deviceClient, "rejectMessage");
  //   const message: Message = new Message(JSON.stringify("bar"));
  //   deviceService.monitorMessages(message);
  //   expect(rejectSpy).toBeCalled();
  // });
});
