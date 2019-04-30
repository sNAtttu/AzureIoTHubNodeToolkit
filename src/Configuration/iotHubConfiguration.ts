import configurationJson from "../../config.json";
import IConfiguration from "./types/configuration";
export default class IoTHubConfiguration {
  public static getConnectionString() {
    return configurationJson.iotHubConnectionString;
  }
}
