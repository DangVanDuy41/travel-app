import * as Location from 'expo-location';

export const useLocationCurrent = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }
  const currentPosition = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = currentPosition.coords;
  const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
  return { lat: latitude, lon: longitude,address:`${reverseGeocode[0].region}` }
};
