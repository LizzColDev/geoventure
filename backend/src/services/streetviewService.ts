import axios, { AxiosResponse } from "axios";
import { StreetViewOptions } from "../types";

const apiKey: string = process.env.GOOGLE_MAPS_API_KEY as string;

const axiosInstance = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api",
  timeout: 5000,
  params: {
    key: apiKey,
    v: '3.49'
  },
});


const  getStreetViewImage =async (options: StreetViewOptions): Promise<string> => {
    try {
      const { latitude, longitude } = options;
      const size = '600x300'
      const heading = '0';
      const streetViewUrl = `/streetview?size=${size}&location=${latitude},${longitude}&heading=${heading}`;
      const response: AxiosResponse<ArrayBuffer> = await axiosInstance.get(streetViewUrl, { responseType: 'arraybuffer' });
      const streetViewImage = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;
      
      if (response.status !== 200) {
        throw new Error(`Error fetching StreetView image. Status code: ${response.status}`);
      }
      
      return streetViewImage;

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
