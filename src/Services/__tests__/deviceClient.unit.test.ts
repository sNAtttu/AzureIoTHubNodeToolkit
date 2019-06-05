import { Client } from "azure-iot-device";
import DeviceClient from "../deviceClient";

jest.mock("azure-iot-device");

describe("Device client wrapper", () => {
  let deviceClient: DeviceClient;

  beforeEach(() => {
    deviceClient = new DeviceClient(Client.fromConnectionString("foobar", {}));
  });

  it("should open connection to the iot hub and execute callback", () => {});
});
