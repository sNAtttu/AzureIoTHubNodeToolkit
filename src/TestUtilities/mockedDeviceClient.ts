import { Callback, DoubleValueCallback } from "azure-iot-common";
import { Client as DeviceClient } from "azure-iot-device";

export default class MockDeviceClient extends DeviceClient {
  constructor(connectionString: string, transportProtocol: any) {
    super(
      DeviceClient.fromConnectionString(connectionString, transportProtocol)
        ._transport,
    );
  }
}
