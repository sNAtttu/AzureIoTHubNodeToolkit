import { v4 } from "uuid";
import { generateDummyData } from "../dummyData";
import {
  validateDeviceId,
  validateMonitorDataActionCliArguments,
  validateObjectPropertyExistence,
  validateSendDataActionCliArguments,
} from "../validation";

describe("Validation", () => {
  it("should return send data arguments if they are valid", () => {
    const args = { interval: 1, deviceId: v4() };
    const validArgs = validateSendDataActionCliArguments(args);
    expect(validArgs.interval).toBe(1);
  });

  it("should throw an exception if the arguments are not valid", () => {
    const args = { interval: 1 };
    expect(() => {
      validateSendDataActionCliArguments(args);
    }).toThrow();
  });

  it("should validate object property existence", () => {
    const deviceData = generateDummyData();
    expect(() => {
      validateObjectPropertyExistence(deviceData, "Version");
    }).not.toThrow();
  });

  it("should validate the cli arguments for monitoring data", () => {
    const args = { deviceId: "device" };
    const validatedArgs = validateMonitorDataActionCliArguments(args);

    expect(validatedArgs.deviceId).toEqual(args.deviceId);
  });

  it("should throw an exception if the arguments are not valid for monitoring", () => {
    const args = {};
    expect(() => {
      validateMonitorDataActionCliArguments(args);
    }).toThrow();
  });

  it("should throw if property is not present", () => {
    const deviceData = generateDummyData();
    expect(() => {
      validateObjectPropertyExistence(deviceData, "FooBar");
    }).toThrow();
  });

  it("should validate and return the device id if it's a valid string", () => {
    const deviceId = "santeri";
    const validatedId = validateDeviceId(deviceId);
    expect(deviceId).toEqual(validatedId);
  });

  it("should throw an exception if the device id is not valid", () => {
    const deviceId = 1;
    expect(() => {
      validateDeviceId(deviceId);
    }).toThrow();
  });
});
