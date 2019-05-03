import { createTestDeviceTwin } from "../../TestUtilities/device";
import FileService from "../fileSystemService";

export default class IotHubService {
  private connectionString: string = "";
  private fileService: FileService;

  constructor(connectionString: string, fileService: FileService) {
    this.connectionString = connectionString;
    this.fileService = fileService;
  }

  public getDeviceTwin() {
    return createTestDeviceTwin();
  }
}
