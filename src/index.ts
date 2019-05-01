import { argv } from "yargs";
import { removeAllCreatedDevices } from "./Actions/removeAllDevices";
import Configuration from "./Configuration/iotHubConfiguration";
import FileService from "./Services/fileSystemService";
import IotHubService from "./Services/iotHubService";
import { verifyParamsForDeviceDelete } from "./Utilities/validation";

const fileService = new FileService();
const iotHubService = new IotHubService(
  Configuration.getConnectionString(),
  fileService,
);

const action: any = argv.action;

console.log("Action initiated is " + action);

switch (action) {
  case "create":
    iotHubService.createNewDevice();
    break;
  case "deleteAll":
    removeAllCreatedDevices(iotHubService, fileService);
    break;
  case "delete":
    const deviceId = verifyParamsForDeviceDelete(argv.deviceId);
    iotHubService.deleteExistingDevice(deviceId);
    break;
  default:
    console.log("Unknown action");
    break;
}
