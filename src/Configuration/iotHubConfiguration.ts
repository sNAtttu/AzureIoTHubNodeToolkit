import configurationJson from "../../config.json";
export default class IoTHubConfiguration {
  public static getConnectionString() {
    return configurationJson.iotHubConnectionString;
  }
}
