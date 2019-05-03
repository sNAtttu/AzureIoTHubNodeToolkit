import { TripleValueCallback } from "azure-iot-common";
import { Logger } from "winston";

export default class CallbackProvider {
  public static getGetTwoParameterCallback(
    logger: Logger,
  ): TripleValueCallback<any, any> {
    return (error, result) => {
      if (error) {
        throw error;
      }
      logger.info(JSON.stringify(result));
    };
  }
}
