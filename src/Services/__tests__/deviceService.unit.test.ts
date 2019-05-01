import { createTestDevice } from "../../TestUtilities/device";
import DeviceService from "../deviceService";

describe("Device service", () => {
  it("should construct connection string for a device using sas authentication", () => {
    const device = createTestDevice();
    const hostName = "IotHub.azure.com";
    const deviceService = new DeviceService(hostName, device);
    const expectedConnectionString = `HostName=${hostName};DeviceId=${
      device.deviceId
    };SharedAccessKey=${device.authentication.symmetricKey.primaryKey}`;
    expect(deviceService.getConnectionString()).toBe(expectedConnectionString);
  });
});
