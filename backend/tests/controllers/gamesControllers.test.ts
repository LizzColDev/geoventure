import { Request, Response, NextFunction } from "express";
import {
  createFirebaseMock,
  addGameMock,
  getUserByIdMock,
  deleteMock,
  addMock,
  getMock,
} from "./firebaseMock";
import { createGame, getGames } from "../../src/controllers/gamesController";
import createError from "http-errors";

let req: Request;
let res: Response;
let next: NextFunction;

jest.mock("firebase-admin", () => {
  const firebaseMock = createFirebaseMock();
  return firebaseMock;
});

describe("Games Controller - POST /games", () => {
  let mockUserId = "user1";
  const mockGameId = "idTestGame";
  const mockTimestamp = expect.any(Number);
  
  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        userId: mockUserId,
      },
    } as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new game in firestore with valid userId", async () => {
    await createGame(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ 
        userId: mockUserId,
        gameId: mockGameId,
        initialTime: mockTimestamp,
      })
    );
    
    expect(addGameMock).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: mockUserId,
        initialTime: mockTimestamp,
      })
    );

    expect(getUserByIdMock).toHaveBeenCalledWith(mockUserId);
    expect(deleteMock).not.toHaveBeenCalled();
    expect(addMock).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
  });

  it("should return 422 status and error message for invalid userId (empty)", async () => {
    req.body.userId = "";

    await createGame(req, res, next);

    // Assert that 'next' is called with the appropriate error
    expect(next).toHaveBeenCalledWith(
      createError(422, "Invalid userId. userId must be a non-empty string.")
    );
  });

  it("should handle and call 'next' for caught errors", async () => {
    // Mock an error being thrown in the controller
    const expectedError = new Error("Test error");
    addGameMock.mockRejectedValueOnce(expectedError);

    await createGame(req, res, next);

    // Assert that 'next' is called with the expected error
    expect(next).toHaveBeenCalledWith(expectedError);
  });
});

describe("GET /games", () =>{
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

  it("should respond with an array of all games in firebase",async () => {
    await getGames(req, res, next);

    // Assert the response status and JSON
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
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
    ])
  })

  it("should respond with 404 and an error message when no games exist in firebase", async () => {
    getMock.mockReturnValueOnce(Promise.resolve({
      forEach: (callback: Function) => {},
    }));

    await getGames(req, res, next);
    expect(next).toHaveBeenCalledWith(
      createError(404, "Not games found.")
    );

  });
  it("should handle errors and call 'next'", async () => {
    getMock.mockImplementationOnce(() => {
      throw new Error("Error retrieving game data");
    });

    await getGames(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Error retrieving game data" })
    );
  });
})

