import { argv } from "yargs";
import Configuration from "./Configuration/iotHubConfiguration";
import IotHubService from "./Services/iotHubService";

const iotHubService = new IotHubService(Configuration.getConnectionString());

const action: any = argv.action;

console.log("Action initiated is " + action);

switch (action) {
  case "create":
    iotHubService.createNewDevice();
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
