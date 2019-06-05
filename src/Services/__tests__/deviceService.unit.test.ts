import { AmqpWs } from "azure-iot-device-amqp";
import { createTestDevice } from "../../TestUtilities/device";
import MockClient from "../../TestUtilities/mockedDeviceClient";
import DeviceService from "../deviceService";

describe("Device service", () => {
  let deviceService: DeviceService;
  const device = createTestDevice();
  const hostName = "IotHub.azure.com";
  beforeEach(() => {
    deviceService = new DeviceService(hostName, device);
    deviceService.setDeviceClient(
      new MockClient(deviceService.getConnectionString(), AmqpWs),
    );
  });

  it("should construct connection string for a device using sas authentication", () => {
    const expectedConnectionString = `HostName=${hostName};DeviceId=${
      device.deviceId
    };SharedAccessKey=${device.authentication.symmetricKey.primaryKey}`;
    expect(deviceService.getConnectionString()).toBe(expectedConnectionString);
  });
});
