export function verifyParamsForDeviceDelete(deviceId: any): string {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error(
      "String parameter 'deviceId' missing. Example: 'node index.js --action delete --deviceid {deviceId}'",
    );
  } else {
    return deviceId;
  }
}
