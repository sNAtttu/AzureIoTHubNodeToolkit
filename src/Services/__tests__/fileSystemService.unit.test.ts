import { createTestDevice } from "../../TestUtilities/device";
import FileService from "../fileSystemService";

jest.mock("fs");

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

  it("should find a device based on the device id", () => {
    const device = createTestDevice();
    const { deviceId } = device;
    fileService.saveCreatedDevice(device);
    const foundDevice = fileService.findDevice(deviceId);
    expect(foundDevice).toEqual(device);
  });
});
