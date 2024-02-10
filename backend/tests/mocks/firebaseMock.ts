import { GameData, UserData } from "../../src/types";

// Functions to generate user and game data
const generateUserData = (): UserData[] => [
  { exists: true, id: "user1", name: "Test User 1" },
  { exists: true, id: "user2", name: "Test User 2" }
];

const generateGameData = (): GameData[] => [
  {
    exists: true,
    id: "gameId1",
    initialTime: 123,
    endTime: 345,
    userId: "test user id 1",
    initialLocation: { latitude: 1, longitude: 2 },
    streetViewImage: "mockedStreetViewImageUrl"
  },
  {
    exists: true,
    id: "gameId2",
    initialTime: 1234,
    endTime: 456,
    userId: "test user id 2",
    initialLocation: { latitude: 1, longitude: 2 },
    streetViewImage: "mockedStreetViewImageUrl"
  }
];

// Object to map collection name to corresponding data generation function
const collectionDataMap: { [key: string]: () => UserData[] | GameData[] } = {
  users: generateUserData,
  games: generateGameData
};


export const createFirebaseMock = () => ({
  ...jest.requireActual("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: (collectionName: string) => ({
      add: addMock.bind(null, collectionName),
      get: getMock.bind(null, collectionName),
      doc: (docId: string) => ({
        get: getByIdMock.bind(null, docId, collectionName),
        delete: jest.fn(),
        set: jest.fn(),
      }),
    }),
  }),
});

// Mocking the Firestore 'add' function with a resolved promise
export const addMock = jest.fn( async (collectionName: string ) => {
  if (collectionName === "users") {
    return Promise.resolve({ id: "1", username: "Samantha" });    
  } else if (collectionName === "games"){
    return Promise.resolve({ 
      id: "idTestGame", 
      userId: "user1", 
      initialTime: 12345, 
      initialLocation: { latitude: 1, longitude: 2 },
      streetViewImage: "mockedStreetViewImageUrl" 
    });
  } 
});


// Function to get collection data
export const getMock = jest.fn(async (collectionName: string) => {
  const dataGenerator = collectionDataMap[collectionName];
  if (dataGenerator) {
    const mockData = dataGenerator();
    return Promise.resolve({
      forEach: (callback: (doc: unknown, index: number, array: unknown[]) => void) => {
        mockData.forEach((dataItem, index) => {
          callback({ data: () => dataItem, id: `test${index + 1}` }, index, mockData);
        });
      }
    });
  } else {
    return Promise.resolve(undefined);
  }
});
  
// Creating a mock for Firebase Firestore operations in the context of retrieving user data
export const getByIdMock =  jest.fn(async (userId, collectionName) => {
  // Simulating the behavior of the `get` method to retrieve user data
  if (collectionName === "users" && userId === "user1") {

    return {
      exists: true,
      id: userId,
      data: () => ({ name: "Juanita Test" }),
    };
  } else if (collectionName === "games" && userId === "idTestGame") {
    return {
      exists: true,
      id: userId,
      data: () => ({
        initialTime: 1699305775356,
        userId: "user1",
        initialLocation: { latitude: 1, longitude: 2 },
        streetViewImage: "mockedStreetViewImageUrl",
      })
    }
  }else {
    throw new Error(`${collectionName === "users" ? "User" : "Game"} not found`);
  }
});
