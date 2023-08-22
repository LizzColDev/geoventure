import { Request, Response, NextFunction } from "express";
import { addMock, createFirebaseMock, deleteMock, getMock, getUserByIdMock } from "./firebaseMock";
import {
  createUser,
  getUserById,
  getUsers,
  deleteUser,
} from "../../src/controllers/userController";
import createError from "http-errors";

let req: Request;
let res: Response;
let next: NextFunction;

// Mocking Firebase admin using custom mock setup
jest.mock("firebase-admin", () => {
  const firebaseMock = createFirebaseMock(); // Creating a mock instance
  return firebaseMock;
});

describe("User Controller - POST /users", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setting up the request body
    req = {
      body: {
        name: "Rosita",
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
      expect.objectContaining({ id: "1", name: "Rosita" })
    );
  });

  it("should return 422 status and error message for invalid username (empty)", async () => {
    req.body.name = "";

    await createUser(req, res, next);

    // Assert that 'next' is called with the appropriate error
    expect(next).toHaveBeenCalledWith(
      createError(422, "Invalid name. Name must be a non-empty string.")
    );
  });
  it("should handle and call 'next' for caught errors", async () => {
    // Mock an error being thrown in the controller
    const expectedError = new Error("Test error");
    addMock.mockRejectedValueOnce(expectedError);

    await createUser(req, res, next);

    // Assert that 'next' is called with the expected error
    expect(next).toHaveBeenCalledWith(expectedError);
  });
});

describe("GET /users", () => {
  // Function to create a mock Express response object
  const mockResponse = (): Response => {
    const response: Partial<Response> = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn();
    return response as Response;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    req = {} as Request;
    res = mockResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should respond with an array of all users in firebase", async () => {
    
    await getUsers(req, res, next);

    // Assert the response status and JSON
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "user1", userName: "Test User 1" },
      { id: "user2", userName: "Test User 2" },
    ]);
  });

  it("should respond with 404 and an error message when no users exist in firebase", async () => {
    getMock.mockReturnValueOnce({
      forEach: (callback: Function) => {},
    })

    await getUsers(req, res, next);
    expect(next).toHaveBeenCalledWith(
      createError(404, "Not users found.")
    );

  });
  it("should handle errors and call 'next'", async () => {
    getMock.mockImplementationOnce(() => {
      throw new Error("Error retrieving user data");
    });

    await getUsers(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Error retrieving user data" })
    );
  });
});

describe("Users Controllers - GET /users/:userId", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {
        userId: "user1",
      },
    } as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn() as NextFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should respond with the user details in firebase", async () => {
    await getUserById(req, res, next);

    expect(getUserByIdMock).toHaveBeenCalledWith('user1');
    
    // Assert the response status, JSON, and next not being called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "user1",
      name: "Juanita Test",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should respond with a 404 status code for user not found", async () => {
    req.params.userId = "nonexist";

    await getUserById(req, res, next);


    expect(getUserByIdMock).toHaveBeenCalled();

    // Assert that next is called with a 404 error
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User not found" })
    );
  });

});

describe("User Controller - DELETE /users/:userId", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {},
      body: {},
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a user in Firebase with valid data", async () => {
    req.params.userId = "user1";

    await deleteUser(req, res, next);

    // Verify that getUserByIdMock is called
    expect(getUserByIdMock).toHaveBeenCalledWith('user1');

    // Verify that deleteMock is called
    expect(deleteMock).toHaveBeenCalled();
    
    // Verify that methods that shouldn't be called are not called
    expect(addMock).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    // Assert the response status and JSON
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: "user1"})
    );
  });

  it("should respond with 404 status for non-existent user", async () => {
    req.params.userId = "nonexistent";

    await deleteUser(req, res, next);

    // Verify that getUserByIdMock is called
    expect(getUserByIdMock).toHaveBeenCalledWith('nonexistent');

    // Verify that deleteMock is not called
    expect(deleteMock).not.toHaveBeenCalled();
    
    // Verify that methods that shouldn't be called are not called
    expect(addMock).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();

    // Assert that next is called with a 404 error
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User not found" })
    );
  });
});
