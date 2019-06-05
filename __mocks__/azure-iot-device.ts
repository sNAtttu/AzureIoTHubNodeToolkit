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
}

export { ConnectionString, Client };
