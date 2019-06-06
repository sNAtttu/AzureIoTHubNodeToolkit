/* tslint:disable:max-classes-per-file */
import { Message as SdkMessage } from "azure-iot-device";
import { EventEmitter } from "events";
// These values are got from other test utilities
const ConnectionString = {
  createWithSharedAccessKey: function createWithSharedAccessKey(
    hostName: string,
    deviceId: string,
    symmetricKey: string,
  ) {
    const connectionString: string = `HostName=${hostName};DeviceId=${deviceId};SharedAccessKey=${symmetricKey}`;
    return connectionString;
  },
};

class Message {
  public messageJsonData: string;
  constructor(jsonData: string) {
    this.messageJsonData = jsonData;
  }
  public getData() {
    return this.messageJsonData;
  }
}

class Client extends EventEmitter {
  public static fromConnectionString(
    connString: string,
    transportConstructor: any,
  ) {
    return new Client();
  }
  constructor() {
    super();
  }
  public open(callback?: (error: Error | undefined) => void) {
    if (callback) {
      callback(undefined);
    }
  }

  public complete(
    message: Message,
    callback: (error: Error | undefined, success: any) => void,
  ) {
    if (message.messageJsonData === "h4x") {
      callback(new Error("There's no message"), undefined);
    } else {
      callback(undefined, message);
    }
  }

  public reject(
    message: Message,
    callback: (error: Error | undefined, success: any) => void,
  ) {
    if (message.messageJsonData === "h4x") {
      callback(new Error("There's no message"), undefined);
    } else {
      callback(undefined, message);
    }
  }

  public sendEvent(
    message: SdkMessage,
    callback: (error: Error | undefined) => void,
  ) {
    callback(undefined);
  }
}

export { ConnectionString, Client, Message };
