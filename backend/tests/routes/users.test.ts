import request from "supertest";
import express, { Express, Response, NextFunction, Request } from "express";
import usersRouter from "../../src/routes/users";
import * as userController from '../../src/controllers/userController';
const app: Express = express();
app.use(express.json());
app.use("/users", usersRouter);

jest.mock("../../src/controllers/userController", () => {
  const originalModule = jest.requireActual("../../src/controllers/userController");
  return {
    ...originalModule,
    createUser: jest.fn(),
    getUsers: jest.fn(),
  };
});

describe("Users Router - POST /users", () => {
  it("should return 201 status for successful user creation", async () => {
    const newUser = { username: "Joel" };
    (userController.createUser as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) => {
        res.status(201).end();
      }
    );

    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(201);
  });

  it("should return 422 error for empty username", async () => {
    const newUser = { username: "" };
    (userController.createUser as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) => {
        res.status(422).json({ error: "Invalid name, name must be a non-empty string." });
      }
    );

    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(422);
    expect(response.body.error).toBe("Invalid name, name must be a non-empty string.");
  });
});

describe("Users Router - GET /users", () => {
  it("should respond with an array of users and a 200 status code", async () => {
    const mockUsers = [
      { id: '5', userName: 'Perla' },
      { id: '4', userName: 'Black' }
    ];
    (userController.getUsers as jest.Mock).mockImplementation(
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(200).json(mockUsers);
      }
    );

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it("should respond with an error and a 500 status code for users empty", async () => {
    (userController.getUsers as jest.Mock).mockImplementation(
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(500).json({ error: 'User retrieval failed' });
      }
    );

    const response = await request(app).get('/users');

    expect(response.status).toBe(500); 
    expect(response.body.error).toBe('User retrieval failed');
  });

  it('should respond with a 404 status code for no users found', async () => {
    (userController.getUsers as jest.Mock).mockImplementation(
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return res.status(404).json({ error: 'No users found.' });
      }
    );

    const response = await request(app).get('/users');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('No users found.');
  });
});
