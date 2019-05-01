import { v4 } from "uuid";
import { ITestDevice } from "./types/testDevice";

export function createTestDevice(): ITestDevice {
  return {
    authentication: {
      symmetricKey: {
        primaryKey: new Buffer(v4()).toString("base64"),
        secondaryKey: new Buffer(v4()).toString("base64"),
      },
    },
    deviceId: v4(),
    status: "enabled",
  };
}
