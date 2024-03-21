import { Request, Response, NextFunction } from "express";
import * as geolib from 'geolib';
import createError from "http-errors";
import { getStreetViewImage } from "../../src/services/streetviewService";
import { UserData } from '../../src/types';
import {
  createFirebaseMock,
  addMock,
  getByIdMock,
  getMock,
} from "../mocks/firebaseMock";
import { createGame, getGameById, getGames, updateGameById, deleteGameById } from "../../src/controllers/gamesController";

jest.mock("firebase-admin", () => createFirebaseMock());
jest.mock("../../src/utils/location/generatedRandomLocation", () => ({
  generateRandomLocation: jest.fn(() => ({ latitude: 1, longitude: 2 })),
}));
jest.mock("../../src/services/streetviewService", () => ({
  getStreetViewImage : jest.fn(() => ({
    urlImage: "data:image/jpeg;base64,/test",
    initialLocation: {
      latitude: 1,
      longitude: 2
    },
    namePlace: "Place test"
  })),
}))
jest.mock('geolib', () => ({ getDistance: jest.fn() }));


let req: Request;
let res: Response;
let next: NextFunction;

const mockUserId = "user1";
const mockGameId = "idTestGame";
const mockUnexistedGame = "unExistedGame"
const mockLocation = { latitude: 1, longitude: 2};
const mockStreetViewImage = getStreetViewImage();

beforeEach(() => {
  jest.clearAllMocks();

  req = {
    params: {},
    body: {},
  } as unknown as Request;
  res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  next = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Games Controller - POST /games", () => {

  it("Should create a new game in firestore with valid userId", async () => {
    req.body.userId = mockUserId;

    await createGame(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ 
        userId: mockUserId,
        gameId: mockGameId,
        initialTime: expect.any(Number),
        streetViewInfo: mockStreetViewImage,
      })
    );
    expect(next).not.toHaveBeenCalled();
    
  });

  it("should handle the case when the user is not found", async () => {
    const mockUserData: UserData= {
      exists: false,
      id: "nonexistent-id",
      name: "NonExistentUser"
    };

    getByIdMock.mockReturnValueOnce(Promise.resolve({ ...mockUserData, data: () => mockUserData }));

    req.body = { userId: 'nonexistentUserId'};

    await createGame(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(404, "User not found"));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should return 422 status and error message for invalid userId (empty)", async () => {
    req.body.userId = "";

    await createGame(req, res, next);

    expect(next).toHaveBeenCalledWith(
      createError(422, '"userId" is not allowed to be empty')
    );
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should handle and call 'next' for caught errors", async () => {
    req.body.userId = mockUserId;
    const expectedError = new Error("Test error");

    addMock.mockRejectedValueOnce(expectedError);

    await createGame(req, res, next);

    expect(next).toHaveBeenCalledWith(expectedError);
  });
});

describe("GET /games", () =>{

  it("should respond with an array of all games in firebase",async () => {

    await getGames(req, res, next);

    // Assert the response status and JSON
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        exists: true,
        id: "gameId1",
        initialTime: 123,
        endTime: 345,
        userId: "test user id 1",
        guessedLocation: mockLocation,
        streetViewInfo: mockStreetViewImage,
      },
      {	exists: true,	
        id: "gameId2",
        initialTime: 1234,
        endTime: 456,
        userId: "test user id 2",
        guessedLocation: mockLocation,
        streetViewInfo: mockStreetViewImage,
    },
    ])
  })

  it("should respond with 404 and an error message when no games exist in firebase", async () => {
    getMock.mockReturnValueOnce(Promise.resolve([]));

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

  it("should respond with the game data in firebase", async () => {
    req.params.gameId = mockGameId

    await getGameById(req, res, next);    
    expect(getByIdMock).toHaveBeenCalledWith(mockGameId, 'games');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: mockGameId,
      initialTime: 1699305775356,
      streetViewInfo: mockStreetViewImage,
      userId: mockUserId,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should respond with a 404 status code for game not found", async () => {
    req.params.gameId = mockUnexistedGame;

    await getGameById(req, res, next);
    expect(getByIdMock).toHaveBeenCalledWith(mockUnexistedGame, 'games');

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringMatching("Game not found") })
    );
  });

});

describe("Games Controllers - PATCH /game/:gameId", () => {
  it("should respond with the updated game data", async () => {
    req.params.gameId = mockGameId;
    req.body = mockLocation;
    
    (geolib.getDistance as jest.Mock).mockReturnValue(50);

    await updateGameById(req, res, next);
    expect(getByIdMock).toHaveBeenCalledWith(mockGameId, 'games');
    expect(res.status).toHaveBeenCalledWith(201);

    const endTime = (res.json as jest.Mock).mock.calls[0][0]?.endTime;
    expect(endTime).toBeGreaterThan(Date.now() - 1000);
    expect(endTime).toBeLessThanOrEqual(Date.now());

    expect(res.json).toHaveBeenCalledWith({
      id: mockGameId,
      initialTime: expect.any(Number),
      endTime: endTime,
      userId: mockUserId,
      guessedLocation: mockLocation,
      distance: 50,
      isGuessCorrect: true,
      streetViewInfo: mockStreetViewImage,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should handle invalid latitude or longitude', async () => {
    req.params.gameId = mockGameId;
    req.body = {
    }; 
    await updateGameById(req, res, next);
  
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledWith(createError(422, '"latitude" is required'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should handle game not found error', async () => {
    req.params.gameId = mockUnexistedGame;
    req.body = mockLocation;
    await updateGameById(req, res, next);
    expect(getByIdMock).toHaveBeenCalledWith(mockUnexistedGame, 'games');

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringMatching("Game not found") })
    );

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe("Game Controller - DELETE /games/:gameId", () => {

  it("should delete a user in Firebase with valid data", async () => {
    req.params.gameId = mockGameId;

    await deleteGameById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: mockGameId })
    );
  });

  it("should respond with 404 status for non-existent user", async () => {
    req.params.gameId = mockUnexistedGame;
    
    await deleteGameById(req, res, next);
    expect(getByIdMock).toHaveBeenCalledWith(mockUnexistedGame, 'games');
    
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringMatching("Game not found") })
    );
  });
});
