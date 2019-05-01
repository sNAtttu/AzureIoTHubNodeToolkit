# AzureIoTHubNodeToolkit

Azure IoT Hub Toolkit

## Usage

This toolkit requires following to run

- NodeJS installed on the machine running this.
- Connection string of an IoT Hub

Available commands

- yarn start --action create
- yarn start --action delete --deviceId {deviceId}

## Configuration

This application expects that there is config.json in the root folder.

Example:
`{ "iotHubConnectionString": "" }`