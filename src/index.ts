import Configuration from "./Configuration/iotHubConfiguration";
import IotHubService from "./Services/iotHubService";

const iotHubService = new IotHubService(Configuration.getConnectionString());
iotHubService.createNewDevice();
