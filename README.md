# Azure IoT Hub Dev Toolkit

Simple toolkit for helping the daily development life with the Azure IoT Hub.

## Usage

This toolkit requires following to run

- NodeJS installed on the machine running this.
- Connection string of an IoT Hub

After required tools are on the computer the tools can be used in a following way

- yarn install
- yarn compile
- one of the available commands

Available commands

- **yarn start --action create**
  - Creates a new device to the IoT Hub. Device information is saved on createdDevices.json.
- **yarn start --action getTwin --deviceId {string}**
  - Gets the device twin of specified device. The application will log the twin and the size of the twin.
- **yarn start --action getDeviceIds**
  - Lists all the device ids found from the createdDevices.json.
- **yarn start --action sendData --deviceId {string} --interval {number}**
  - Starts to send data to the platform with the pre specified interval (seconds).
- **yarn start --action delete --deviceId {string}**
  - Deleted the specified device.
- **yarn start --action deleteAll**
  - Deletes all the devices which are saved in the createdDevices.json.

Optional parameters

- loggerLevel
  - Possible values are: "error", "warn", "info", "verbose", "debug", "silly"
  - Example: `yarn start --action create --loggerLevel silly`

## Configuration

This application expects that there is config.json in the root folder.

Example:
`{ "HostName": "", "SharedAccessKeyName": "", "SharedAccessKey": "" }`

**Remember to compile after changing the config, the compilation includes the config in the dist folder.**

## Tests

Project contains few unit tests which can be ran using command "yarn test"
