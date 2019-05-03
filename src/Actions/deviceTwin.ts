import { TripleValueCallback } from "azure-iot-common";
import IotHubService from "../Services/iotHubService";
import { validateObjectPropertyExistence } from "../Utilities/validation";

function removeMetadataFromProperties(desired: any, reported: any) {
  desired.$metadata = undefined;
  desired.$version = undefined;
  reported.$metadata = undefined;
  reported.$version = undefined;
}

function getDeviceTwin(
  iotHubService: IotHubService,
  deviceId: string,
  callback: TripleValueCallback<any, any>,
) {
  iotHubService.getDeviceTwin(deviceId, callback);
}

function countDeviceTwinSize(deviceTwin: any): number {
  validateObjectPropertyExistence(deviceTwin, "properties");
  const {
    properties: { reported, desired },
    tags,
  } = deviceTwin;

  removeMetadataFromProperties(desired, reported);

  const reportedWithoutWhiteSpaces = JSON.stringify(reported);
  const desiredWithoutWhiteSpaces = JSON.stringify(desired);
  const tagsWithoutWhiteSpaces = JSON.stringify(tags);

  const totalCharacters =
    reportedWithoutWhiteSpaces +
    desiredWithoutWhiteSpaces +
    tagsWithoutWhiteSpaces;

  return Buffer.byteLength(totalCharacters, "utf-8");
}

export { getDeviceTwin, countDeviceTwinSize };
