import { createTestDevice } from "../../TestUtilities/device";
import FileService from "../fileSystemService";

describe("File system service", () => {
  let fileService: FileService;
  beforeEach(() => {
    fileService = new FileService();
  });

  afterEach(() => {
    fileService.deleteCreatedDevicesFromDisk();
  });

  it("should add created device to the createdDevices json", () => {
    const device = createTestDevice();
    fileService.saveCreatedDevice(device);
    expect(fileService.getCreatedDevices()).toContain(device);
  });

  it("should remove device Id from the array", () => {
    const device = createTestDevice();
    const device2 = createTestDevice();

    fileService.saveCreatedDevice(device);
    fileService.saveCreatedDevice(device2);

    fileService.removeDevice(device.deviceId);
    expect(fileService.getCreatedDevices()).toEqual([device2]);
  });
  // Not the best unit test since we communicate with the file system but this is ok for now.
  it("should save the devices to a file if explicitly requested", () => {
    const device = createTestDevice();
    fileService.saveCreatedDevice(device);
    fileService.saveDevicesToDisk();
    expect(fileService.doesCreatedDevicesFileExist()).toBe(true);
    expect(fileService.getCreatedDevices()).toEqual([device]);
  });
});
