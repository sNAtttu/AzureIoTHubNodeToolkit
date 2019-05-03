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

- yarn start --action create
- yarn start --action getTwin --deviceId {deviceId}
- yarn start --action delete --deviceId {deviceId}
- yarn start --action deleteAll

Optional parameters

- loggerLevel
  - Possible values are: "error", "warn", "info", "verbose", "debug", "silly"
  - Example: `yarn start --action create --loggerLevel silly`

## Configuration

This application expects that there is config.json in the root folder.

Example:
`{ "HostName": "", "SharedAccessKeyName": "", "SharedAccessKey": "" }`
