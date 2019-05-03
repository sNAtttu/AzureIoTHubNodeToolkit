import { ConnectionString as DeviceConnectionString } from "azure-iot-device";
import { Device } from "azure-iothub";

export default class DeviceService {
  private connectionString: string = "";

  constructor(hostName: string, device: Device) {
    this.connectionString = this.constructConnectionString(hostName, device);
  }

  public getConnectionString() {
    return this.connectionString;
  }

  private constructConnectionString(hostName: string, device: Device): string {
    if (device && device.authentication && device.authentication.symmetricKey) {
      return DeviceConnectionString.createWithSharedAccessKey(
        hostName,
        device.deviceId,
        device.authentication.symmetricKey.primaryKey,
      );
    }
    return "";
  }
}
