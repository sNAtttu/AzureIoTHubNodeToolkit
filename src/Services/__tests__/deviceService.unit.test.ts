import { createTestDevice } from "../../TestUtilities/device";
import DeviceService from "../deviceService";

jest.mock("../deviceClient");

describe("Device service", () => {
  let deviceService: DeviceService;
  const device = createTestDevice();
  const hostName = "IotHub.azure.com";
  beforeEach(() => {
    deviceService = new DeviceService(hostName, device);
  });

  it("should construct connection string for a device using sas authentication", () => {
    const expectedConnectionString = `HostName=${hostName};DeviceId=${
      device.deviceId
    };SharedAccessKey=${device.authentication.symmetricKey.primaryKey}`;
    expect(deviceService.getConnectionString()).toBe(expectedConnectionString);
  });
});
