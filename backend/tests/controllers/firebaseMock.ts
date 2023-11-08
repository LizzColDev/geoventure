export const createFirebaseMock = () => ({
  ...jest.requireActual("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: (collectionName: string) => ({
      add: collectionName === "users" ? addMock : addGameMock,
      get: collectionName === "users" ? getMock : getMock,
      doc: (docId: string) => ({
        get: getUserByIdMock.bind(null, docId),
        delete: deleteMock,
      }),
    }),
  }),
});

// Mocking the Firestore 'add' function with a resolved promise
export const addMock = jest.fn((data: object) => {
  return Promise.resolve({ id: "1", username: "Samantha" });
});

export const getMock = jest.fn(() => ({
  forEach: (callback: (value: any, index: number, array: any[]) => void) => {
    const mockUsers = [
      { id: "user1", userName: "Test User 1" },
      { id: "user2", userName: "Test User 2" },
    ];

    // Loop through the mockUsers array and execute the callback for each user
    mockUsers.forEach((user, index) => {
      callback({ data: () => user, id: `user${index + 1}` }, index, mockUsers);
    });
  },
}));

// Creating a mock for Firebase Firestore operations in the context of retrieving user data
export const getUserByIdMock =  jest.fn(async (userId: string) => {
    // Simulating the behavior of the `get` method to retrieve user data
    if (userId === "user1") {
      return {
        exists: true,
        id: userId,
        data: () => ({ name: "Juanita Test" }),
      };
    } else {
      throw new Error("User not found");
    }
  });

export const deleteMock = jest.fn(() => Promise.resolve());

export const addGameMock = jest.fn(() => {
  return Promise.resolve({ id: "idTestGame", userId: "user1", initialTime: 12345 });
});
