import { Device } from "azure-iothub";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { Logger } from "winston";
import LoggerFactory from "../Utilities/logger";
export default class FileService {
  private createdDevices: Device[] = [];
  private logger: Logger;
  private readonly createdDevicesPath = "./createdDevices.json";
  constructor() {
    this.logger = LoggerFactory.createLogger("FileService");
    this.createdDevices = this.loadDevicesFromDisk();
  }

  public saveCreatedDevice(device: Device) {
    this.createdDevices.push(device);
  }

  public getCreatedDevices(): Device[] {
    const devices = this.createdDevices;
    this.isThereDevices(devices);
    return this.createdDevices;
  }

  public getCreatedDeviceIds(): string[] {
    const devices = this.createdDevices;
    this.isThereDevices(devices);
    return devices.map((device) => device.deviceId);
  }

  public findDevice(deviceId: string): Device {
    this.logger.info(`Finding a device with device id: ${deviceId}`);
    const deviceFound = this.createdDevices.find(
      (device) => device.deviceId === deviceId,
    );
    if (!deviceFound) {
      throw new Error("There's no device with Id: " + deviceFound);
    }
    this.logger.info("Device found.");
    return deviceFound;
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
      this.saveDevices();
    }
  }

  public deleteCreatedDevicesFromDisk() {
    this.createdDevices = [];
    if (this.doesCreatedDevicesFileExist()) {
      unlinkSync(this.createdDevicesPath);
    }
  }

  private isThereDevices(devices: Device[]) {
    if (devices.length === 0) {
      this.logger.warn("There are no created devices");
    }
  }

  private saveDevices() {
    const path: string = this.createdDevicesPath;
    const data: string = JSON.stringify(this.createdDevices);
    this.logger.info("Saving data to the disk");
    writeFileSync(path, data, { encoding: "utf8" });
  }

  private loadDevicesFromDisk(): Device[] {
    if (this.doesCreatedDevicesFileExist()) {
      const devicesArray = JSON.parse(
        readFileSync(this.createdDevicesPath, { encoding: "utf8" }),
      );
      this.logger.info(`Loaded ${devicesArray.length} devices to the memory`);
      return devicesArray;
    } else {
      return [];
    }
  }
}
