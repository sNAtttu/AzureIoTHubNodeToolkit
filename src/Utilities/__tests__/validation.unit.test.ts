import { v4 } from "uuid";
import { validateSendDataActionCliArguments } from "../validation";

describe("Validation", () => {
  it("should return send data arguments if they are valid", () => {
    const args = { interval: 1, deviceId: v4() };
    const validArgs = validateSendDataActionCliArguments(args);
    expect(validArgs.interval).toBe(1);
  });
});
