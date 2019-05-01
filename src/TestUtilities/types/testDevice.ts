import { Device } from "azure-iothub";

export interface ITestDevice extends Device {
  deviceId: string;
  status: "enabled" | "disabled";
  authentication: {
    symmetricKey: {
      primaryKey: string;
      secondaryKey: string;
    };
  };
}
