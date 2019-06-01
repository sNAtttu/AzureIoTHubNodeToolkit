import { v4 } from "uuid";
import { generateDummyData } from "../dummyData";
import {
  validateObjectPropertyExistence,
  validateSendDataActionCliArguments,
} from "../validation";

describe("Validation", () => {
  it("should return send data arguments if they are valid", () => {
    const args = { interval: 1, deviceId: v4() };
    const validArgs = validateSendDataActionCliArguments(args);
    expect(validArgs.interval).toBe(1);
  });

  it("should validate object property existence", () => {
    const deviceData = generateDummyData();
    expect(() => {
      validateObjectPropertyExistence(deviceData, "Version");
    }).not.toThrow();
  });

  it("should throw if property is not present", () => {
    const deviceData = generateDummyData();
    expect(() => {
      validateObjectPropertyExistence(deviceData, "FooBar");
    }).toThrow();
  });
});
