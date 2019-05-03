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

export function createTestDeviceTwin(): any {
  const { deviceId, status } = createTestDevice();
  return {
    deviceId,
    etag: "AAAAAAAAAAE=",
    deviceEtag: "MTMwMDU2MDkx",
    status,
    statusUpdateTime: "0001-01-01T00:00:00",
    connectionState: "Disconnected",
    lastActivityTime: "0001-01-01T00:00:00",
    cloudToDeviceMessageCount: 0,
    authenticationType: "sas",
    x509Thumbprint: { primaryThumbprint: null, secondaryThumbprint: null },
    version: 2,
    properties: {
      desired: {
        $metadata: { $lastUpdated: "2019-05-03T22:41:23.188774Z" },
        $version: 1,
      },
      reported: {
        $metadata: { $lastUpdated: "2019-05-03T22:41:23.188774Z" },
        $version: 1,
      },
    },
    capabilities: { iotEdge: false },
    tags: {},
  };
}
