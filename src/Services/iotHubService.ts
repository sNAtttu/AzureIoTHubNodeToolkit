import { Device, Registry } from "azure-iothub";
import FileService from "./fileSystemService";
export default class IotHubService {
  private registryClient: Registry;
  private fileService: FileService;

  constructor(connectionString: string) {
    this.registryClient = this.createRegistryClient(connectionString);
    this.fileService = new FileService();
  }

  public createNewDevice() {
    const device = {
      deviceId: "sample-device-" + Date.now(),
    };
    this.registryClient.create(device, this.deviceCreateCallback.bind(this));
  }

  public deleteExistingDevice(deviceId: string) {
    console.log("Deleting device with a device id: " + deviceId);
    this.registryClient.delete(deviceId, this.deviceDeleteCallback);
  }

  private deviceDeleteCallback(
    error: Error | undefined,
    nullValue: null,
    transportInfo: any,
  ) {
    if (error) {
      console.log(`Device deletion failed: ${error}`);
      return;
    }
    console.log("Device deleted");
  }

  private deviceCreateCallback(
    error: Error | undefined,
    deviceInfo: Device | undefined,
  ) {
    if (error || deviceInfo === undefined) {
      console.log(error);
      return;
    }
    if (
      deviceInfo &&
      deviceInfo.authentication &&
      deviceInfo.authentication.symmetricKey
    ) {
      console.log(`deviceId: ${deviceInfo.deviceId}`);
      console.log(
        `Primary SAS Key: ${deviceInfo.authentication.symmetricKey.primaryKey}`,
      );
      console.log(
        `Secondary SAS Key: ${
          deviceInfo.authentication.symmetricKey.secondaryKey
        }`,
      );
      this.fileService.saveCreatedDevice(deviceInfo.deviceId);
      this.fileService.saveDevicesToDisk();
    }
  }

  private createRegistryClient(connectionString: string): Registry {
    return Registry.fromConnectionString(connectionString);
  }
}
