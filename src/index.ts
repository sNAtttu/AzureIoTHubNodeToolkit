import { argv } from "yargs";
import { getDeviceTwin } from "./Actions/deviceTwin";
import { removeAllCreatedDevices } from "./Actions/removeAllDevices";
import Configuration from "./Configuration/iotHubConfiguration";
import FileService from "./Services/fileSystemService";
import IotHubService from "./Services/iotHubService";
import CallbackProvider from "./Utilities/callbackProvider";
import constants from "./Utilities/constants";
import LoggerFactory from "./Utilities/logger";
import { validateDeviceId } from "./Utilities/validation";

const logger = LoggerFactory.createLogger(
  "Index",
  typeof argv.loggerLevel === "string" ? argv.loggerLevel : undefined,
);
const fileService = new FileService();
const iotHubConnectionString = Configuration.getConnectionString();
logger.verbose(`using ${iotHubConnectionString} to connect to the iot hub`);
const iotHubService = new IotHubService(iotHubConnectionString, fileService);
const action: any = argv.action;
const { actions } = constants;
logger.info("Action initiated is " + action);

switch (action) {
  case actions.create:
    iotHubService.createNewDevice();
    break;
  case actions.deleteAll:
    removeAllCreatedDevices(iotHubService, fileService);
    break;
  case actions.delete:
    const deviceIdForDeletion = validateDeviceId(argv.deviceId);
    iotHubService.deleteExistingDevice(deviceIdForDeletion);
    break;
  case actions.getTwin:
    const deviceIdForTwin = validateDeviceId(argv.deviceId);
    getDeviceTwin(
      iotHubService,
      deviceIdForTwin,
      CallbackProvider.getTwinCallback(logger),
    );
    break;
  default:
    logger.warn("Unknown action");
    break;
}
