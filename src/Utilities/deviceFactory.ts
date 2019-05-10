import { Device } from "azure-iothub";
import DeviceService from "../Services/deviceService";
import IotDevice from "../Services/sasDeviceService";

export default class IotDeviceFactory {
  public static getSasDevice(sasSignature: string): IotDevice {
    const iotDevice = new IotDevice(sasSignature);
    return iotDevice;
  }

  public static getDeviceService(hostName: string, device: Device): DeviceService {
    return new DeviceService(hostName, device);
  }
}
