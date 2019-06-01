import {
  Client as DeviceClient,
  ConnectionString as DeviceConnectionString,
  Message,
} from "azure-iot-device";
import { AmqpWs } from "azure-iot-device-amqp";
import { Device } from "azure-iothub";
import { Logger } from "winston";
import { generateDummyData } from "../Utilities/dummyData";
import LoggerFactory from "../Utilities/logger";

export default class DeviceService {
  private connectionString: string = "";
  private deviceClient: DeviceClient;
  private logger: Logger;
  constructor(hostName: string, device: Device) {
    this.connectionString = this.constructConnectionString(hostName, device);
    this.deviceClient = DeviceClient.fromConnectionString(
      this.connectionString,
      AmqpWs,
    );
    this.logger = LoggerFactory.createLogger("IoTDevice");
  }

  public getConnectionString() {
    return this.connectionString;
  }

  public startSendingData(interval: number) {
    this.openConnection((openConnectionError) => {
      LoggerFactory.handleErrorLogging(openConnectionError, this.logger);
      this.logger.info(
        `Starting to send data with an interval of ${interval *
          1000} milliseconds.`,
      );
      setInterval(() => {
        const dummyData = generateDummyData();
        const message = new Message(JSON.stringify(dummyData));
        this.logger.info(
          "Sending message with timestamp: " +
            dummyData.DeviceProperties.CreatedTime,
        );
        this.logger.debug(dummyData);
        this.deviceClient.sendEvent(message, (sendDataError) =>
          LoggerFactory.handleErrorLogging(sendDataError, this.logger),
        );
      }, interval * 1000);
      this.deviceClient.on("message", (message: Message) => {
        this.logger.info(`${JSON.stringify(message.getData())}`);
      });
    });
  }

  public startMonitoringDevice() {
    this.openConnection((openConnectionError) => {
      LoggerFactory.handleErrorLogging(openConnectionError, this.logger);
      this.logger.info(`Starting to monitor messages for specified device.`);
      this.logger.silly(this.connectionString);
      this.deviceClient.on("message", (message: Message) => {
        this.logger.info(`${JSON.stringify(message.getData())}`);
      });
      this.deviceClient.on("error", (error: Error) =>
        LoggerFactory.handleErrorLogging(error, this.logger),
      );
    });
  }

  private openConnection(callback?: (error: Error | undefined) => void) {
    this.deviceClient.open((error) => {
      if (callback !== undefined) {
        callback(error);
      } else {
        LoggerFactory.handleErrorLogging(error, this.logger);
      }
    });
  }
  private constructConnectionString(hostName: string, device: Device): string {
    if (device && device.authentication && device.authentication.symmetricKey) {
      return DeviceConnectionString.createWithSharedAccessKey(
        hostName,
        device.deviceId,
        device.authentication.symmetricKey.primaryKey,
      );
    }
    return "";
  }
}
