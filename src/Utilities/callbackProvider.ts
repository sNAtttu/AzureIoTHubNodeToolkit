import { TripleValueCallback } from "azure-iot-common";
import { Logger } from "winston";
import { countDeviceTwinSize } from "../Actions/deviceTwin";

export default class CallbackProvider {
  public static getTwoParameterCallback(
    logger: Logger,
  ): TripleValueCallback<any, any> {
    return (error, result) => {
      if (error) {
        throw error;
      }
      logger.info(JSON.stringify(result));
    };
  }

  public static getTwinCallback(logger: Logger): TripleValueCallback<any, any> {
    return (error, deviceTwin) => {
      if (error) {
        throw error;
      }
      logger.info("Fetched device twin");
      logger.info(
        `Device twin size is around ~${countDeviceTwinSize(deviceTwin)} bytes`,
      );
      logger.info(JSON.stringify(deviceTwin));
    };
  }
}
