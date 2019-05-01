import { Device } from "azure-iothub";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
export default class FileService {
  private createdDevices: Device[] = [];
  private readonly createdDevicesPath = "./createdDevices.json";
  constructor() {
    this.createdDevices = this.loadDevicesFromDisk();
  }

  public saveCreatedDevice(device: Device) {
    this.createdDevices.push(device);
  }

  public getCreatedDevices(): Device[] {
    return this.createdDevices;
  }

  public saveDevicesToDisk() {
    this.saveDevices();
  }

  public doesCreatedDevicesFileExist(): boolean {
    return existsSync(this.createdDevicesPath);
  }

  public removeDevice(deviceId: string) {
    const indexOfDevice = this.createdDevices.findIndex(
      (device) => device.deviceId === deviceId,
    );
    if (indexOfDevice !== -1) {
      this.createdDevices.splice(indexOfDevice, 1);
    }
  }

  public deleteCreatedDevicesFromDisk() {
    this.createdDevices = [];
    if (this.doesCreatedDevicesFileExist()) {
      unlinkSync(this.createdDevicesPath);
    }
  }

  private saveDevices() {
    const path: string = this.createdDevicesPath;
    const data: string = JSON.stringify(this.createdDevices);
    writeFileSync(path, data, { encoding: "utf8" });
  }

  private loadDevicesFromDisk(): Device[] {
    if (this.doesCreatedDevicesFileExist()) {
      const devicesArray = JSON.parse(
        readFileSync(this.createdDevicesPath, { encoding: "utf8" }),
      );
      return devicesArray;
    } else {
      return [];
    }
  }
}
