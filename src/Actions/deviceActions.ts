import {
  IMonitorDataArguments,
  ISendDataArguments,
} from "../Interfaces/cliArguments";
import FileService from "../Services/fileSystemService";
import IotDeviceFactory from "../Utilities/deviceFactory";
import {
  validateMonitorDataActionCliArguments,
  validateSendDataActionCliArguments,
} from "../Utilities/validation";

export function startSendingData(
  argv: any,
  fileService: FileService,
  hostName: string,
) {
  const sendDataArguments: ISendDataArguments = validateSendDataActionCliArguments(
    argv,
  );
  const { interval, deviceId } = sendDataArguments;
  const existingDevice = fileService.findDevice(deviceId);
  const deviceService = IotDeviceFactory.getDeviceService(
    hostName,
    existingDevice,
  );
  deviceService.startSendingData(interval);
}

export function startMonitoringData(
  argv: any,
  fileService: FileService,
  hostName: string,
) {
  const sendDataArguments: IMonitorDataArguments = validateMonitorDataActionCliArguments(
    argv,
  );
  const { deviceId } = sendDataArguments;
  const existingDevice = fileService.findDevice(deviceId);
  const deviceService = IotDeviceFactory.getDeviceService(
    hostName,
    existingDevice,
  );
  deviceService.startMonitoringDevice();
}
