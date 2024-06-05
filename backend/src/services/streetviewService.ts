import axios from "axios";
import { Coordinates, StreetViewInfo } from "../types";

const GOOGLE_MAPS_API_KEY: string = process.env.GOOGLE_MAPS_API_KEY as string;


// Function to search for famous places using Google Places API
const searchFamousPlace = async (): Promise<StreetViewInfo[]> => {
  try {
    const response = await axios.post(
      'https://places.googleapis.com/v1/places:searchText',
      {
        textQuery: 'tourist_attraction in the world',
        rankPreference: 'RELEVANCE',
        minRating: 4.5,
        maxResultCount: 10
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.location,places.types,places.viewport',
        },
        
      }
    );

    const famousPlaces: StreetViewInfo[] = response.data.places?.map((
      place: { location: Coordinates, displayName: { text: string } }
    ) => ({
      initialLocation: place.location,
      namePlace: place.displayName.text
    })) || [];
    return famousPlaces;

  } catch (error: unknown) {
    console.error('Error fetching places', error);
    throw new Error('Error fetching places.');
  }
}

export { searchFamousPlace };
