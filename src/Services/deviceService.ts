import { Client, ConnectionString } from "azure-iot-device";

export default class DeviceService {
  private deviceId: string = "";
  constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  private constructConnectionString(
    hostName: string,
    deviceId: string,
    primaryKey: string,
  ): string {
    return ConnectionString.createWithSharedAccessKey(
      hostName,
      deviceId,
      primaryKey,
    );
  }
}
