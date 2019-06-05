import constants from "../Utilities/constants";
import LoggerFactory from "../Utilities/logger";

export function cloudToDeviceMessageHandler(cloudToDeviceMessagePayload: any) {
  const logger = LoggerFactory.createLogger("C2DHandler");
  logger.info("Cloud to device message received");
  logger.info(JSON.stringify(cloudToDeviceMessagePayload));

  const { action } = cloudToDeviceMessagePayload;
  switch (action) {
    case constants.cloudToDeviceActions.stop:
      logger.info("Application will stop monitoring C2D messages");
      process.exit();
      break;
    default:
      logger.warn("Unsupported action");
      break;
  }
}
