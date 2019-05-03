import FileService from "../../Services/fileSystemService";
import IotHubService from "../../Services/iotHubService";
import { getDeviceTwin } from "../deviceTwin";

jest.mock("../../Services/iotHubService");

describe("Device twin action", () => {
  let iotHubService: IotHubService;

  beforeEach(() => {
    iotHubService = new IotHubService("connectionString", new FileService());
  });

  it("should fetch the device twin", () => {
    const deviceId = "deviceId";
    getDeviceTwin(iotHubService, deviceId, (error, twin) => {
      expect(twin.deviceId).toBe(deviceId);
    });
  });
});
