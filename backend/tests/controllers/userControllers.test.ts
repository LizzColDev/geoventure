import { Request, Response, NextFunction } from "express";
import { createUser, getUserById, getUsers } from "../../src/controllers/userController";
import createError from 'http-errors';

let req: Request;
let res: Response;
let next: NextFunction;

// Mocking the Firestore 'add' function with a resolved promise
const addMock = jest.fn((data: object) => {
  return Promise.resolve({ id: "1", username: "Samantha" });
});

const docsMock = jest.fn((data: object) => {
  return Promise.resolve([
    { id: 'user1', userName: 'Test User 1'},
    { id: 'user2', userName: 'Test User 2'}
  ]);
});

    
const getMock = jest.fn(() => ({
  forEach: (callback: (value: any, index: number, array: any[]) => void) => {
    const mockUsers = [
      { id: 'user1', userName: 'Test User 1' },
      { id: 'user2', userName: 'Test User 2' }
    ];

    // Loop through the mockUsers array and execute the callback for each user
    mockUsers.forEach((user, index) => {
      callback({ data: () => user, id: `user${index + 1}` }, index, mockUsers);
    });
  }
}));

jest.mock("firebase-admin", () => ({
  ...jest.mock("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: () => ({
      docs: docsMock ,
      add: addMock,
      get: getMock,
    }),
  }),
}));

describe("User Controller - POST /users", () => {

  beforeEach(() => {
    req = {
      body: {
        name: "Samantha",
      },
    } as Request;

    // Mocking the response object with appropriate methods
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mocking the 'next' function
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user in Firebase with valid data", async () => {
    await createUser(req, res, next);

    // Assert the response status and JSON
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", name: "Samantha" })
    );
  });

  it("should return 422 status and error message for invalid username (empty)", async () => {
    
    req.body.name = '';

    await createUser(req, res, next);

    // Assert that 'next' is called with the appropriate error
    expect(next).toHaveBeenCalledWith(createError(422, 'Invalid name. Name must be a non-empty string.'));
  });

  it("should handle database error and call next with the error", async () => {

    const errorMock = new Error("Database error");

    // Mock the 'add' function to return a rejected promise with the error
    addMock.mockRejectedValueOnce(errorMock);

    await createUser(req, res, next);

    // Assert that 'next' is called with the database error
    expect(next).toHaveBeenCalledWith(errorMock);
  });

});

describe('GET /users', () => {

  const mockResponse = (): Response => {
    const response: Partial<Response> = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn();
    return response as Response;
  };

  beforeEach(() => {
    req = {} as Request;
    res = mockResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should respond with an array of all users in firebase", async () => {

    await getUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 'user1', userName: 'Test User 1'},
      { id: 'user2', userName: 'Test User 2'}
    ]);
  });

  it("should respond with 500 and an error message for a server error", async () => {

  });
});

describe("Users Controllers - GET /users/:userId", () => {
  it("should respond with the user details in firebase", async () => {
    console.log("res object before calling getUserById:", res);
    await getUserById(req, res, next);
    console.log("res object after calling getUserById:", res);
  
    console.log("res.status mock:", res.status);
  
    const statusMock = res.status as jest.MockedFunction<typeof res.status>;
    const jsonMock = res.json as jest.MockedFunction<typeof res.json>;
  
    console.log("statusMock.mock.calls:", statusMock.mock.calls);
    console.log("jsonMock.mock.calls:", jsonMock.mock.calls);
  
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: 'user1', userName: 'Juana Test' });
    expect(next).not.toHaveBeenCalled();
  });

  it("should respond with an error and a 500 status code for user retrieval failure", async () => {
    await getUserById(req, res, next);

  });

  it("should respond with a 404 status code for user not found", async () => {
    await getUserById(req, res, next);
  });
});