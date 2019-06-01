import configurationJson from "../../../config.json";
import Configuration from "../iotHubConfiguration";

describe("Configuration", () => {
  it("should create a connection string based on configuration json", () => {
    const connectionString = Configuration.getConnectionString();
    const {
      HostName,
      SharedAccessKeyName,
      SharedAccessKey,
    } = configurationJson;

    // tslint:disable-next-line: max-line-length
    const connString = `HostName=${HostName};SharedAccessKeyName=${SharedAccessKeyName};SharedAccessKey=${SharedAccessKey}`;
    expect(connectionString).toEqual(connString);
  });

  it("should get the hostname from the configuration json", () => {
    const hostName: string = Configuration.getHostName();
    expect(hostName).toBeTruthy();
  });

  it("should get the configuration", () => {
    expect(Configuration.getConfiguration()).toBeTruthy();
  });
});
