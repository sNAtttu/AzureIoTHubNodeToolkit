import { TripleValueCallback } from "azure-iot-common";
import { Logger } from "winston";
import IotHubService from "../Services/iotHubService";

function getDeviceTwin(
  iotHubService: IotHubService,
  logger: Logger,
  deviceId: string,
) {
  const callback: TripleValueCallback<any, any> = (error, deviceTwin) => {
    if (error) {
      logger.error(error);
      throw error;
    }
    logger.info(JSON.stringify(deviceTwin));
  };
  iotHubService.getDeviceTwin(deviceId, callback);
}
export { getDeviceTwin };
