import { TripleValueCallback } from "azure-iot-common";
import { createTestDeviceTwin } from "../../TestUtilities/device";
import FileService from "../fileSystemService";

export default class IotHubService {
  private connectionString: string = "";
  private fileService: FileService;

  constructor(connectionString: string, fileService: FileService) {
    this.connectionString = connectionString;
    this.fileService = fileService;
  }

  public getDeviceTwin(
    service: IotHubService,
    callback: TripleValueCallback<any, any>,
  ) {
    const twin = createTestDeviceTwin();
    callback(undefined, twin);
  }
}
