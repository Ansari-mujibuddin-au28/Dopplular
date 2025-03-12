import * as Device from 'expo-device';

export const getDeviceInfo = () => ({
  brand: Device.brand,
  model: Device.modelName,
  osName: Device.osName,
  osVersion: Device.osVersion,
  deviceType: Device.deviceType,
});
