import { Device, Registry } from "azure-iothub";
import { v4 } from "uuid";
import { Logger } from "winston";
import LoggerFactory from "../Utilities/logger";
import FileService from "./fileSystemService";
export default class IotHubService {
  private registryClient: Registry;
  private fileService: FileService;
  private logger: Logger;
  private deviceIdToBeRemoved: string;

  constructor(connectionString: string, fileService: FileService) {
    this.registryClient = this.createRegistryClient(connectionString);
    this.fileService = fileService;
    this.logger = LoggerFactory.createLogger("IoTHubService");
    this.deviceIdToBeRemoved = "";
  }

  public createNewDevice() {
    const device = {
      deviceId: v4(),
    };
    this.registryClient.create(device, this.deviceCreateCallback.bind(this));
  }

  public deleteExistingDevice(deviceId: string) {
    this.logger.info("Deleting device with a device id: " + deviceId);
    this.deviceIdToBeRemoved = deviceId;
    this.registryClient.delete(deviceId, this.deviceDeleteCallback.bind(this));
  }

  private deviceDeleteCallback(
    error: Error | undefined,
    nullValue: null,
    transportInfo: any,
  ) {
    if (error) {
      this.logger.error(`Device deletion failed: ${error}`);
      return;
    }
    this.fileService.removeDevice(this.deviceIdToBeRemoved);
    this.logger.info("Device deleted");
    this.deviceIdToBeRemoved = "";
  }

  private deviceCreateCallback(
    error: Error | undefined,
    deviceInfo: Device | undefined,
  ) {
    if (error || deviceInfo === undefined) {
      this.logger.error(`Device creation failed: ${error}`);
      return;
    }
    this.logDeviceInformation(deviceInfo);
  }

  private logDeviceInformation(deviceInfo: Device) {
    if (
      deviceInfo &&
      deviceInfo.authentication &&
      deviceInfo.authentication.symmetricKey
    ) {
      this.logger.info(`deviceId: ${deviceInfo.deviceId}`);
      this.logger.info(
        `Primary SAS Key: ${deviceInfo.authentication.symmetricKey.primaryKey}`,
      );
      this.logger.info(
        `Secondary SAS Key: ${
          deviceInfo.authentication.symmetricKey.secondaryKey
        }`,
      );
      this.saveDeviceInfo(deviceInfo);
    }
  }

  private saveDeviceInfo(deviceInfo: Device) {
    this.fileService.saveCreatedDevice(deviceInfo);
    this.fileService.saveDevicesToDisk();
  }

  private createRegistryClient(connectionString: string): Registry {
    return Registry.fromConnectionString(connectionString);
  }
}
