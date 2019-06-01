import { unlinkSync, writeFileSync } from "fs";
import { createTestDevice } from "../../TestUtilities/device";
import FileService from "../fileSystemService";
jest.mock("fs");

describe("File system service", () => {
  let fileService: FileService;
  const createdDevicesPath = "./createdDevices.json";
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

  it("should return all the device ids of the created devices", () => {
    const device = createTestDevice();
    fileService.saveCreatedDevice(device);
    const deviceIds = fileService.getCreatedDeviceIds();
    expect(deviceIds).toContain(device.deviceId);
  });

  it("should load devices from the disk (createdDevices.json)", () => {
    // Initialize variables
    const testDevice = createTestDevice();
    // Store original functions
    const originalDeviceExistsCheck = fileService.doesCreatedDevicesFileExist;
    const originalJsonParse = JSON.parse;

    // Replace them with mocks
    fileService.doesCreatedDevicesFileExist = jest.fn().mockReturnValue(true);
    JSON.parse = jest.fn().mockReturnValue([testDevice]);

    // Execute functionality
    fileService.loadDevices();

    // Assert
    expect(fileService.getCreatedDevices()).toEqual([testDevice]);
    // Restore original functions
    fileService.doesCreatedDevicesFileExist = originalDeviceExistsCheck;
    JSON.parse = originalJsonParse;
  });

  it("should load devices from the disk (createdDevices.json)", () => {
    const originalDeviceExistsCheck = fileService.doesCreatedDevicesFileExist;
    fileService.doesCreatedDevicesFileExist = jest.fn().mockReturnValue(false);
    fileService.loadDevices();
    fileService.doesCreatedDevicesFileExist = originalDeviceExistsCheck;
    expect(fileService.getCreatedDevices()).toEqual([]);
  });

  it("should delete created devices from the disk if they exist", () => {
    const originalDeviceExistsCheck = fileService.doesCreatedDevicesFileExist;
    fileService.doesCreatedDevicesFileExist = jest.fn().mockReturnValue(true);
    fileService.deleteCreatedDevicesFromDisk();
    expect(unlinkSync).toBeCalledWith(createdDevicesPath);
    fileService.doesCreatedDevicesFileExist = originalDeviceExistsCheck;
  });

  it("should save devices to a disk", () => {
    const device = createTestDevice();
    const expectedDataToBeSaved = JSON.stringify([device]);
    fileService.saveCreatedDevice(device);
    fileService.saveDevicesToDisk();
    expect(writeFileSync).toBeCalledWith(
      createdDevicesPath,
      expectedDataToBeSaved,
      { encoding: "utf8" },
    );
  });

  it("should throw an exception if a device is not found", () => {
    expect(() => {
      fileService.findDevice("santeri");
    }).toThrow();
  });
});
