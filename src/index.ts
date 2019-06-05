import { argv } from "yargs";
import {
  getDeviceConnectionString,
  startMonitoringData,
  startSendingData,
} from "./Actions/deviceActions";
import { getDeviceTwin } from "./Actions/deviceTwin";
import { removeAllCreatedDevices } from "./Actions/removeAllDevices";
import Configuration from "./Configuration/iotHubConfiguration";
import { ISendDataArguments } from "./Interfaces/cliArguments";
import FileService from "./Services/fileSystemService";
import IotHubService from "./Services/iotHubService";
import CallbackProvider from "./Utilities/callbackProvider";
import constants from "./Utilities/constants";
import IotDeviceFactory from "./Utilities/deviceFactory";
import LoggerFactory from "./Utilities/logger";
import {
  validateDeviceId,
  validateSendDataActionCliArguments,
} from "./Utilities/validation";

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
  case actions.getDeviceIds:
    const deviceIds = fileService.getCreatedDeviceIds();
    logger.info(deviceIds.join("\n"));
    break;
  case actions.sendData:
    startSendingData(argv, fileService, Configuration.getHostName());
    break;
  case actions.monitor:
    startMonitoringData(argv, fileService, Configuration.getHostName());
    break;
  case actions.getConnectionString:
    const connectionString = getDeviceConnectionString(
      argv,
      fileService,
      Configuration.getHostName(),
    );
    logger.info(
      `Connection string for device ${argv.deviceId} is ${connectionString}`,
    );
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
