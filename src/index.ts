import { argv } from "yargs";
import { removeAllCreatedDevices } from "./Actions/removeAllDevices";
import Configuration from "./Configuration/iotHubConfiguration";
import FileService from "./Services/fileSystemService";
import IotHubService from "./Services/iotHubService";

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
    if (!argv.deviceId || typeof argv.deviceId !== "string") {
      throw new Error(
        "String parameter 'deviceId' missing. Example: 'node index.js --action delete --deviceid {deviceId}'",
      );
    }
    iotHubService.deleteExistingDevice(argv.deviceId);
    break;
  default:
    console.log("Unknown action");
    break;
}
