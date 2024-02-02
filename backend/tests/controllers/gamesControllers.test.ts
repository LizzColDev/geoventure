import { Request, Response, NextFunction } from "express";
import * as geolib from 'geolib';
import {
  createFirebaseMock,
  addGameMock,
  getByIdMock,
  deleteMock,
  addMock,
  getMock,
} from "./firebaseMock";
import { createGame, getGameById, getGames, updateGameById, deleteGameById } from "../../src/controllers/gamesController";
import createError from "http-errors";
import { generateRandomLocation } from "../../src/utils/location/generatedRandomLocation";
import { UserData } from '../../src/types';
import { getStreetViewImage } from "../../src/services/streetviewService";
let req: Request;
let res: Response;
let next: NextFunction;

jest.mock("firebase-admin", () => {
  const firebaseMock = createFirebaseMock();
  return firebaseMock;
});

jest.mock("../../src/utils/location/generatedRandomLocation", () => ({
  generateRandomLocation: jest.fn(() => ({ latitude: 1, longitude: 2 })),
}));

jest.mock("../../src/services/streetviewService", () => ({
  getStreetViewImage : jest.fn(() => ("mockedStreetViewImageUrl")),
}))

jest.mock('geolib', () => ({
  getDistance: jest.fn(),
}));

describe("Games Controller - POST /games", () => {
  const mockUserId = "user1";
  const mockGameId = "idTestGame";
  const mockTimestamp = expect.any(Number);
  const mockInitialLocation = generateRandomLocation();
  const mockStreetViewImage = getStreetViewImage({ latitude: 1, longitude: 2 });

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
        initialLocation: mockInitialLocation,
        streetviewImage: mockStreetViewImage,
      })
    );
    
    expect(addGameMock).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: mockUserId,
        initialTime: mockTimestamp,
        initialLocation: mockInitialLocation,
        streetviewImage: mockStreetViewImage,
      })
    );

    expect(deleteMock).not.toHaveBeenCalled();
    expect(addMock).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
  });

  it("should handle the case when the user is not found", async () => {
      const mockUserData: UserData= {
        exists: false,
        id: "nonexistent-id",
        name: "NonExistentUser"
      };

    const mockDocument = {
      ...mockUserData,
      data: jest.fn(() => mockUserData),
    };

    getByIdMock.mockReturnValueOnce(Promise.resolve(mockDocument));
    
    await createGame(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(404, "User not found"));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(addGameMock).not.toHaveBeenCalled();
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

describe("Games Controllers - GET /game/:gameId", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {
        gameId: "game1",
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

  it("should respond with the game data in firebase", async () => {
    await getGameById(req, res, next);

    expect(getByIdMock).toHaveBeenCalledWith('game1', 'games');
    
    // Assert the response status, JSON, and next not being called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "game1",
      initialTime: 1699305775356,
      userId: "user1"
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should respond with a 404 status code for game not found", async () => {
    req.params.gameId = "nonexist";

    await getGameById(req, res, next);


    expect(getByIdMock).toHaveBeenCalled();

    // Assert that next is called with a 404 error
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Game not found" })
    );
  });

});

describe("Games Controllers - PATCH /game/:gameId", () => {
  const mockGameId = "game1";
  const mockInitialLocation = { latitude: 30, longitude: 40 };
  const mockEstimatedLocation = { latitude: 1, longitude: 2 };
  const mockDistance = 50;
  const mockUserId = "user1"

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {
        gameId: mockGameId,
      },
      body: mockEstimatedLocation,
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

  it("should respond with the updated game data", async () => {
        // Mock Firestore 'get' to simulate the existing game document
    getByIdMock.mockResolvedValueOnce({
      exists: true,
      id: mockGameId,
      data: () => ({
        initialTime: expect.any(Number),
        userId: mockUserId,
        initialLocation: mockInitialLocation,
      }),
    });
    (geolib.getDistance as jest.Mock).mockReturnValue(50);

    await updateGameById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);

    const endTime = (res.json as jest.Mock).mock.calls[0][0]?.endTime;
    expect(endTime).toBeGreaterThan(Date.now() - 1000);
    expect(endTime).toBeLessThanOrEqual(Date.now());

    expect(res.json).toHaveBeenCalledWith({
      id: mockGameId,
      initialTime: expect.any(Number),
      initialLocation: mockInitialLocation,
      endTime: endTime,
      userId: mockUserId,
      estimatedLocation: mockEstimatedLocation,
      distance: mockDistance,
      isGuessCorrect: true,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should handle invalid latitude or longitude', async () => {
    // Test data with invalid coordinates
    
    const req: any = { params: { gameId: 'game1' }, body: {} };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
  
    // Function call
    await updateGameById(req, res, next);
  
    // Verification of function calls and results
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should handle game not found error', async () => {
    getByIdMock.mockImplementationOnce(async () => ({
      exists: false,
      id: null,
      data: () => ({
        initialTime: 0,
        userId: '',
      }),
    }));

    await updateGameById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(createError.NotFound));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe("Game Controller - DELETE /games/:gameId", () => {
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
    req.params.gameId = "game1";

    await deleteGameById(req, res, next);

    // Verify that getByIdMock is called
    expect(getByIdMock).toHaveBeenCalledWith('game1', 'games');

    // Verify that deleteMock is called
    expect(deleteMock).toHaveBeenCalled();
    
    // Verify that methods that shouldn't be called are not called
    expect(addMock).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    // Assert the response status and JSON
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: "game1"})
    );
  });

  it("should respond with 404 status for non-existent user", async () => {
    req.params.gameId = "nonexistent";

    await deleteGameById(req, res, next);

    // Verify that getByIdMock is called
    expect(getByIdMock).toHaveBeenCalledWith('nonexistent', 'games');

    // Verify that deleteMock is not called
    expect(deleteMock).not.toHaveBeenCalled();
    
    // Verify that methods that shouldn't be called are not called
    expect(addMock).not.toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();

    // Assert that next is called with a 404 error
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Game not found" })
    );
  });
});
