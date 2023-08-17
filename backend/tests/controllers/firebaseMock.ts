export const createFirebaseMock = () => ({
  ...jest.requireActual("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: () => ({
      add: addMock,
      get: getMock,
      doc: getUserByIdMock,
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

export const getUserByIdMock = (userId: string) => ({
  get: async () => {
    if (userId === "user1") {
      return {
        exists: true,
        id: userId,
        data: () => ({ name: "Juanita Test" }),
      };
    } else {
      return {
        exists: false,
      };
    }
  },
  
  delete: async (data: any) => {return Promise.resolve()},
  
  set: async () => {
    if (userId === "user1") {
      return {
        id: userId,
        data: () => ({ initialTime: Number }),
      };
    } else {
      return {
        exists: false,
      };
    }
  },
});