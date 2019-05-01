import configurationJson from "../../config.json";
export default class IoTHubConfiguration {
  public static getConnectionString(): string {
    const {
      HostName,
      SharedAccessKeyName,
      SharedAccessKey,
    } = configurationJson;
    return `HostName=${HostName};SharedAccessKeyName=${SharedAccessKeyName};SharedAccessKey=${SharedAccessKey}`;
  }
}
