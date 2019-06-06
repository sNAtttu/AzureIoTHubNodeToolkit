import {
  Client as DeviceClient,
  ConnectionString as DeviceConnectionString,
  Message,
} from "azure-iot-device";
import { Logger } from "winston";
import LoggerFactory from "../Utilities/logger";

export default class DeviceClientWrapper {
  public registeredListeners: Map<string, any>;

  private deviceClient: DeviceClient;
  private logger: Logger;

  private readonly messageEventHandlerName: string = "message";
  private readonly errorEventHandlerName: string = "error";

  constructor(deviceClient: DeviceClient) {
    this.deviceClient = deviceClient;
    this.logger = LoggerFactory.createLogger("DeviceClientWrapper");
    this.registeredListeners = new Map();
    this.registerErrorListener();
  }

  public openConnectionToIotHub(
    iotHubAction?: (error: Error | undefined) => void,
  ) {
    this.deviceClient.open((error) => {
      if (iotHubAction !== undefined) {
        iotHubAction(error);
      } else {
        LoggerFactory.handleErrorLogging(error, this.logger);
      }
    });
  }

  public sendMessageToIotHub(jsonData: any) {
    this.logger.info("Sending message");
    this.logger.info(JSON.stringify(jsonData));
    const message = new Message(JSON.stringify(jsonData));
    this.deviceClient.sendEvent(message, (sendDataError) =>
      LoggerFactory.handleErrorLogging(sendDataError, this.logger),
    );
  }

  public registerListenerForMessages(
    listenerId: string,
    listener: (c2dMessage: Message) => void,
  ) {
    this.deviceClient.on(this.messageEventHandlerName, listener);
    this.registeredListeners.set(listenerId, listener);
  }

  public registerErrorListener() {
    this.deviceClient.on(this.errorEventHandlerName, (error: Error) =>
      LoggerFactory.handleErrorLogging(error, this.logger),
    );
  }

  public emitMessageFromDeviceClient(messageName: string, ...args: any) {
    this.deviceClient.emit(messageName, ...args);
  }

  public completeMessage(message: Message) {
    this.deviceClient.complete(message, (error, messageCompleted) => {
      if (error) {
        this.logger.error(error);
      }
      this.logger.info("Message completed");
      this.logger.silly(JSON.stringify(messageCompleted));
    });
  }

  public rejectMessage(message: Message) {
    this.deviceClient.reject(message, (error, messageCompleted) => {
      if (error) {
        this.logger.error(error);
      }
      this.logger.info("Message rejected");
      this.logger.silly(JSON.stringify(messageCompleted));
    });
  }
}
