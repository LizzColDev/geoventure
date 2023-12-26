export const createFirebaseMock = () => ({
  ...jest.requireActual("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: (collectionName: string) => ({
      add: collectionName === "users" ? addMock : addGameMock,
      get: getMock.bind(null, collectionName),
      doc: (docId: string) => ({
        get: getByIdMock.bind(null, docId, collectionName),
        delete: deleteMock,
      }),
    }),
  }),
});

// Mocking the Firestore 'add' function with a resolved promise
export const addMock = jest.fn((data: object) => {
  return Promise.resolve({ id: "1", username: "Samantha" });
});

export const getMock = jest.fn(async (collectionName) => {
  return Promise.resolve({
    forEach: (callback: (value: any, index: number, array: any[]) => void) => {
      let mockData: any[] = []
      if(collectionName === "users"){
        const users = [
          { id: "user1", userName: "Test User 1" },
          { id: "user2", userName: "Test User 2" },
        ];
        mockData = users;
      }
      else if(collectionName === "games"){
        const games = [
          {
            id: "gameId1",
            initialTime: 123,
            userId: "test user id 1"
          },
          {		
            id: "gameId2",
            initialTime: 1234,
            userId: "test user id 2"
        },
        ];
        mockData = games;
      }
  
      // Loop through the mockData array and execute the callback for each user or game
      mockData.forEach((dataItem, index) => {
        callback({ data: () => dataItem, id: `test${index + 1}` }, index, mockData);
      });
    },
  })
  

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
    } else if (collectionName === "games" && userId === "game1") {
      return {
        exists: true,
        id: userId,
        data: () => ({
          initialTime: 1699305775356,
          userId: "user1"
        })
      }
    }else {
      throw new Error(`${collectionName === "users" ? "User" : "Game"} not found`);
    }
  });

export const deleteMock = jest.fn(() => Promise.resolve());

export const addGameMock = jest.fn(() => {
  return Promise.resolve({ id: "idTestGame", userId: "user1", initialTime: 12345 });
});
