import axios, { AxiosResponse, AxiosError } from 'axios';
import { UserData } from '../types/types';

// Create an instance of Axios with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Function to create a new user and return UserData
export const createUser = async (UserData: Omit<UserData, 'id'>): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await api.post('/user', UserData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
    throw error;
  }
};

// Function to delete a user by ID (does not return any data)
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
    throw error; // 
  }
};

// Function to handle Axios errors
const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code outside of 2xx
    console.error('Request failed with status:', error.response.status);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received from server:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error setting up the request:', error.message);
  }
};
