import { readFileSync } from "fs";
import IConfiguration from "./types/configuration";
export default class IoTHubConfiguration {
  public static getConnectionString() {
    const configObject: IConfiguration = JSON.parse(
      readFileSync("../../config.json", "utf8"),
    );
    return configObject.iotHubConnectionString;
  }
}
