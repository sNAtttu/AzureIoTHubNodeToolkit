# AzureIoTHubNodeToolkit

Azure IoT Hub Toolkit

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
- yarn start --action delete --deviceId {deviceId}
- yarn start --action deleteAll

## Configuration

This application expects that there is config.json in the root folder.

Example:
`{ "HostName": "", "SharedAccessKeyName": "", "SharedAccessKey": "" }`
