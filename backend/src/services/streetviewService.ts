import axios, { AxiosResponse } from "axios";
import { Coordinates, StreetViewInfo } from "../types";
import { getRandomLocation } from "../utils/location/generatedRandomLocation";

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

// Function to get a random Street View image of a famous place
const  getStreetViewImage =async (): Promise<StreetViewInfo> => {
  try {
    const uniqueLocations = await searchFamousPlace();

    const randomLocation = getRandomLocation(uniqueLocations);
    const { initialLocation, namePlace } = randomLocation;
    const { latitude, longitude } = initialLocation;
    const size = '600x300'
    const heading = '0';
    const streetViewUrl = 
      `https://maps.googleapis.com/maps/api/streetview?size=${size}` +
      `&location=${latitude},${longitude}&heading=${heading}&key=${GOOGLE_MAPS_API_KEY}`;
      
    const response: AxiosResponse<ArrayBuffer> = await axios.get(streetViewUrl, { responseType: 'arraybuffer' });
    const streetViewImage = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;
      
    if (response.status !== 200) {
      throw new Error(`Error fetching StreetView image. Status code: ${response.status}`);
    }
    return { urlImage: streetViewImage, initialLocation: initialLocation, namePlace: namePlace };

  } catch (error:unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching StreetView image:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Error fetching StreetView image.');
  }
}

export { getStreetViewImage };
