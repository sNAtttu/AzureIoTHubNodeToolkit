import { cpus, totalmem } from "os";

export function generateDummyData() {
  return {
    ObjectType: "DeviceInfo",
    IsSimulatedDevice: 0,
    Version: "1.0",
    DeviceProperties: {
      HubEnabledState: 1,
      CreatedTime: new Date().toISOString(),
      Platform: "NodeJS",
      Processor: cpus()[0].model,
      Memory: totalmem(),
      Temperature: Math.random() * 100,
      Humidity: Math.random() * 100,
    },
  };
}
