import { Client } from "azure-iot-device";
import LoggerFactory from "../../Utilities/logger";
import DeviceClient from "../deviceClient";

jest.mock("azure-iot-device");

describe("Device client wrapper", () => {
  let deviceClient: DeviceClient;
  let handleErrorLoggingMock: jest.Mock;

  beforeEach(() => {
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
});
