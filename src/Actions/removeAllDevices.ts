import FileService from "../Services/fileSystemService";
import IotHubService from "../Services/iotHubService";

export function removeAllCreatedDevices(
  iotHubService: IotHubService,
  fileService: FileService,
) {
  const deviceIds = fileService.getCreatedDevices();
  deviceIds.forEach((deviceId) => {
    iotHubService.deleteExistingDevice(deviceId);
    fileService.removeDevice(deviceId);
  });
  fileService.deleteCreatedDevicesFromDisk();
}
