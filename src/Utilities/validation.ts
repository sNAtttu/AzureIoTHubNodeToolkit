function validateDeviceId(deviceId: any): string {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error(
      "String parameter 'deviceId' missing. Example: 'node index.js --action delete --deviceid {deviceId}'",
    );
  } else {
    return deviceId;
  }
}

function validateObjectPropertyExistence(
  objectToBeValidated: any,
  property: string,
) {
  if (
    typeof objectToBeValidated !== "object" ||
    !objectToBeValidated.hasOwnProperty(property)
  ) {
    throw new Error(
      `Given object does not contain property called ${property}`,
    );
  }
}

export { validateDeviceId, validateObjectPropertyExistence };
