import { ISendDataArguments } from "../Interfaces/cliArguments";
import FileService from "../Services/fileSystemService";
import IotDeviceFactory from "../Utilities/deviceFactory";
import { validateSendDataActionCliArguments } from "../Utilities/validation";

export function startSendingData(argv: any, fileService: FileService, hostName: string) {
  const sendDataArguments: ISendDataArguments = validateSendDataActionCliArguments(argv);
  const { interval, deviceId } = sendDataArguments;
  const existingDevice = fileService.findDevice(deviceId);
  const deviceService = IotDeviceFactory.getDeviceService(hostName, existingDevice);
  deviceService.startSendingData(interval);
}
