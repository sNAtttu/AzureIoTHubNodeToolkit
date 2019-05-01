import FileService from "../Services/fileSystemService";
import IotHubService from "../Services/iotHubService";

export function removeAllCreatedDevices(
  iotHubService: IotHubService,
  fileService: FileService,
) {
  const devices = fileService.getCreatedDevices();
  devices.forEach((device) => {
    iotHubService.deleteExistingDevice(device.deviceId);
    fileService.removeDevice(device.deviceId);
  });
  fileService.deleteCreatedDevicesFromDisk();
}
