import {
  Client as DeviceClient,
  ConnectionString as DeviceConnectionString,
  Message,
} from "azure-iot-device";
import { AmqpWs } from "azure-iot-device-amqp";
import { Device } from "azure-iothub";
import { Logger } from "winston";
import { cloudToDeviceMessageHandler } from "../Actions/cloudToDeviceActions";
import DeviceClientWrapper from "../Services/deviceClient";
import { generateDummyData } from "../Utilities/dummyData";
import LoggerFactory from "../Utilities/logger";
export default class DeviceService {
  public deviceEventTimers: NodeJS.Timeout[];
  public deviceClient: DeviceClientWrapper;
  private connectionString: string = "";
  private logger: Logger;

  constructor(hostName: string, device: Device) {
    this.connectionString = this.constructConnectionString(hostName, device);
    this.deviceClient = new DeviceClientWrapper(
      DeviceClient.fromConnectionString(this.connectionString, AmqpWs),
    );
    this.logger = LoggerFactory.createLogger("IoTDevice");
    this.deviceEventTimers = [];
  }

  public getConnectionString() {
    return this.connectionString;
  }

  public startSendingData(interval: number) {
    this.deviceClient.openConnectionToIotHub((openConnectionError) => {
      LoggerFactory.handleErrorLogging(openConnectionError, this.logger);
      this.logger.info(
        `Starting to send data with an interval of ${interval *
          1000} milliseconds.`,
      );
      const dummyEventSender = setInterval(() => {
        const dummyData = generateDummyData();
        this.deviceClient.sendMessageToIotHub(dummyData);
      }, interval * 1000);

      this.deviceEventTimers.push(dummyEventSender);
    });
  }

  public startMonitoringDevice() {
    this.deviceClient.openConnectionToIotHub((openConnectionError) => {
      LoggerFactory.handleErrorLogging(openConnectionError, this.logger);
      this.logger.info(`Starting to monitor messages for specified device.`);
      this.logger.silly(this.connectionString);
      this.deviceClient.registerListenerForMessages(
        "monitorMessages",
        this.monitorMessages,
      );
    });
  }

  public monitorMessages(message: Message) {
    const jsonData = JSON.parse(message.getData().toString());
    try {
      cloudToDeviceMessageHandler(jsonData);
      this.deviceClient.completeMessage(message);
    } catch (exception) {
      this.deviceClient.rejectMessage(message);
    }
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
