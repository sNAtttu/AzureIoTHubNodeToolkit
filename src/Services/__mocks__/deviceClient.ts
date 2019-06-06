import { EventEmitter } from "events";

export default class DeviceClient extends EventEmitter {
  public registeredListeners: Map<string, any>;
  constructor() {
    super();
    this.registeredListeners = new Map();
  }

  public openConnectionToIotHub(actionToBeCalled: any) {
    actionToBeCalled();
  }

  public sendMessageToIotHub(jsonData: any) {}

  public registerListenerForMessages(listernedId: string, listener: any) {
    this.registeredListeners.set(listernedId, listener);
  }

  public rejectMessage(message: any) {}

  public completeMessage(message: any) {}
}
