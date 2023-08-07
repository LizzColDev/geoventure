import { Request, Response, NextFunction } from "express";
import { createUser } from "../../src/controllers/userController";
import createError from 'http-errors';

// Mocking the Firestore 'add' function with a resolved promise
const addMock = jest.fn((data: object) => {
  return Promise.resolve({ id: "1", username: "Samantha" });
});

// Mocking the 'firebase-admin' module with custom implementations
jest.mock("firebase-admin", () => ({
  ...jest.mock("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: () => ({
      add: addMock,
    }),
  }),
}));

describe("User Controller - POST /users", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

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

describe('GET /api/users', () => {

  it("should respond with an array of all users in firebase", async () => {

  });

  it("should respond with 500 and an error message for a server error", async () => {

  });

})

