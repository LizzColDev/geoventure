import axios, { AxiosResponse, AxiosError } from 'axios';
import { GameData } from '../types/types';

// Create an instance of Axios with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// Function to create a new game and return GameData
export const createGame = async (id: string): Promise<GameData> => {
  try {
    const response: AxiosResponse<GameData> = await api.post('/game', {
      userId: id
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
    throw error;
  }
};

// Function to update an existing game and return GameData
export const updateGame = async (gameData: GameData): Promise<GameData> => {
  try {
    const { id, guessedLocation } = gameData;
    console.log('guessed:ocation fore update', guessedLocation)
    const response: AxiosResponse<GameData> = await api.patch(`/game/${id}`, {
      latitude: guessedLocation?.latitude,
      longitude: guessedLocation?.longitude
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
    throw error;
  }
};

// Function to fetch all games and return GameData[]
export const fetchAllGames = async (): Promise<GameData[]> => {
  try {
    const response: AxiosResponse<GameData[]> = await api.get('/games');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
    throw error;
  }
};

// Function to fetch a game by ID and return GameData
export const getGameById = async (id: string): Promise<GameData> => {
  try {
    const response: AxiosResponse<GameData> = await api.get(`/game/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    }
    throw error;
  }
};

// Function to delete a game by ID (does not return any data)
export const deleteGame = async (id: string): Promise<void> => {
  try {
    await api.delete(`/game/${id}`);
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
