import { ISendDataArguments } from "../Interfaces/cliArguments";

function validateDeviceId(deviceId: any): string {
  if (!deviceId || typeof deviceId !== "string") {
    throw new Error(
      "String parameter 'deviceId' missing. Example: 'node index.js --action delete --deviceid {deviceId}'",
    );
  }
  return deviceId;
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

function validateSendDataActionCliArguments(argv: any): ISendDataArguments {
  const { interval } = argv;
  const intervalIsValid = interval && typeof interval === "number";
  if (intervalIsValid) {
    return {
      interval,
    };
  }
  throw new Error("Send data arguments are invalid");
}

export { validateDeviceId, validateObjectPropertyExistence, validateSendDataActionCliArguments };
