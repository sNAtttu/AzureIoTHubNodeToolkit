import FileService from "../fileSystemService";

describe("File system service", () => {
  let fileService: FileService;
  beforeEach(() => {
    fileService = new FileService();
  });

  afterAll(() => {
    fileService.deleteCreatedDevicesFromDisk();
  });
  it("should add created device to the createdDevices json", () => {
    const deviceId = "testDeviceId";
    fileService.saveCreatedDevice(deviceId);
    expect(fileService.getCreatedDevices()).toContain(deviceId);
  });

  it("should remove device Id from the array", () => {
    const deviceId1 = "did1";
    const deviceId2 = "did2";

    fileService.saveCreatedDevice(deviceId1);
    fileService.saveCreatedDevice(deviceId2);

    fileService.removeDevice(deviceId1);
    expect(fileService.getCreatedDevices()).toEqual([deviceId2]);
  });
  // Not the best unit test since we communicate with the file system but this is ok for now.
  it("should save the devices to a file if explicitly requested", () => {
    const deviceId = "testDeviceId";
    fileService.saveCreatedDevice(deviceId);
    fileService.saveCreatedDevice(deviceId + "2");
    fileService.saveDevicesToDisk();
    expect(fileService.doesCreatedDevicesFileExist()).toBe(true);
    expect(fileService.getCreatedDevices()).toEqual([deviceId, deviceId + "2"]);
  });
});
