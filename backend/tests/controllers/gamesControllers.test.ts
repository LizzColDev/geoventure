import { Request, Response, NextFunction } from "express";
import { createFirebaseMock } from "./firebaseMock";
import { createGame } from "../../src/controllers/gamesController";
let req: Request;
let res: Response;
let next: NextFunction;

jest.mock("firebase-admin", () => {
    const firebaseMock = createFirebaseMock();
    return firebaseMock;
  });

describe("Games Controller - POST /games", () => {

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                userId: 'user1',
            },
        } as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should create a new game', async () => {

        await createGame(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toBeCalledWith({
            userId: 'user1',
            initialTime: expect.any(Number),
        });
        
    });

})
