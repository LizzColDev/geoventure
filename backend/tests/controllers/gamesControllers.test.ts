import { Request, Response, NextFunction } from "express";
import {
  createFirebaseMock,
  addGameMock,
  getUserByIdMock,
  deleteMock,
  addMock,
  getMock,
} from "./firebaseMock";
import { createGame } from "../../src/controllers/gamesController";

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

});
