export const initGoogleMaps = async () => {
  const googleMaps = window.google.maps;
  await googleMaps.importLibrary('maps');
  await googleMaps.importLibrary('visualization');
  const { AdvancedMarkerElement } = await googleMaps.importLibrary('marker') as google.maps.MarkerLibrary;
  return {googleMaps, AdvancedMarkerElement}
}
