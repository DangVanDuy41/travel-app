const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox'

export async function getDirection(form: any, to: any) {
  const response = await fetch(
    `${BASE_URL}/driving/${form[0]},${form[1]};${to[0]},${to[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAP_KEY!}`
  )
  const data = await response.json();
  return data
}


export async function getDirectionLocation(locations: [number, number][]) {
  const coordinates = locations.map(([lon, lat]) => `${lon},${lat}`).join(';');

  const response = await fetch(
    `${BASE_URL}/driving/${coordinates}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=true&access_token=${process.env.EXPO_PUBLIC_MAP_KEY!}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
