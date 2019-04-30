import { Device, Registry } from "azure-iothub";

export default class IotHubService {
  private connectionString: string = "";
  private registryClient: Registry;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    this.registryClient = this.createRegistryClient(connectionString);
  }

  public createNewDevice() {
    const device = {
      deviceId: "sample-device-" + Date.now(),
    };
    this.registryClient.create(device, this.deviceCreateCallback);
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
      console.log("Created device");
      console.log(`deviceId: ${deviceInfo.deviceId}`);
      console.log(
        `Primary SAS Key: ${deviceInfo.authentication.symmetricKey.primaryKey}`,
      );
      console.log(
        `Secondary SAS Key: ${
          deviceInfo.authentication.symmetricKey.secondaryKey
        }`,
      );
    }
  }

  private createRegistryClient(connectionString: string): Registry {
    return Registry.fromConnectionString(connectionString);
  }
}
