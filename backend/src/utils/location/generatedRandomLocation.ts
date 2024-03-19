import { StreetViewInfo } from "../../types";

let currentIndex = 0;

export const getRandomLocation = (locations: StreetViewInfo[]): StreetViewInfo => {
  // Check if the locations array is empty
  if (locations.length === 0) {
    throw new Error('The list of locations is empty.');
  }

  try {
    // Get the current location
    const currentLocation = locations[currentIndex];
    // Move to the next location
    currentIndex = (currentIndex + 1) % locations.length;
    
    return currentLocation;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching the random location.');
  }
}
