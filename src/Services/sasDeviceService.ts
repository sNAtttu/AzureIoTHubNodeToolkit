import { Client as DeviceClient, Message } from "azure-iot-device";
import { Amqp } from "azure-iot-device-amqp";
import { Logger } from "winston";
import { generateDummyData } from "../Utilities/dummyData";
import LoggerFactory from "../Utilities/logger";

export default class IotDevice {

  private deviceClient: DeviceClient;
  private logger: Logger;

  constructor(sharedAccessSignature: string) {
    this.deviceClient = DeviceClient.fromSharedAccessSignature(sharedAccessSignature, Amqp);
    this.logger = LoggerFactory.createLogger("IoTDevice");
  }

  public startSendingData(interval: number) {
    this.deviceClient.open((openConnectionError) => {
      LoggerFactory.handleErrorLogging(openConnectionError, this.logger);

      setInterval(() => {
        const dummyData = generateDummyData();
        const message = new Message(JSON.stringify(dummyData));
        this.logger.info("Sending message with timestamp: " + dummyData.DeviceProperties.CreatedTime);
        this.logger.debug(dummyData);
        this.deviceClient.sendEvent(message, (sendDataError) =>
          LoggerFactory.handleErrorLogging(sendDataError, this.logger));
        }, interval);

    });
  }

}
