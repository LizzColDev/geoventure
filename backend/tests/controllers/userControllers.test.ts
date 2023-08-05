import { Request, Response, NextFunction } from "express";
import { createUser } from "../../src/controllers/userController";
import createError from 'http-errors';

jest.mock("firebase-admin", () => ({
  ...jest.mock("firebase-admin"),
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: () => ({
      add: (data: object) => {
        return Promise.resolve({ id: "1", username: "Samantha" });
      },
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

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user in Firebase with valid data", async () => {
    await createUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", name: "Samantha" })
    );
  });

  it("should return 422 status and error message for invalid username (empty)", async () => {
    
    req.body.name = '';

    await createUser(req, res, next);

    expect(next).toHaveBeenCalledWith(createError(422, 'Invalid name. Name must be a non-empty string.'));
  });
});
