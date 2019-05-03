import { TripleValueCallback } from "azure-iot-common";
import IotHubService from "../Services/iotHubService";

function getDeviceTwin(
  iotHubService: IotHubService,
  deviceId: string,
  callback: TripleValueCallback<any, any>,
) {
  iotHubService.getDeviceTwin(deviceId, callback);
}
export { getDeviceTwin };
