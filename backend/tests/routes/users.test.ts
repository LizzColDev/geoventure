import request from "supertest";
import express, { Express, Response, NextFunction, Request } from "express";
import usersRouter from "../../src/routes/users";

const app: Express = express();
app.use(express.json());
app.use("/users", usersRouter);

jest.mock("../../src/controllers/userController", () => ({
  createUser: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    if (!username) {
      return res
        .status(422)
        .json({ error: "Invalid name, name must be a non-empty string." });
    }
    res.status(201).end();
  },
  getUsers: async (req: any, res: any) => {
    const mockUsers = [
      { id: '5', userName: 'Perla' },
      { id: '4', userName: 'Black' }
    ];
    res.status(200).json(mockUsers);
  },
}));

describe("Users Router", () => {
  it("should return 201 status for successful user creation", async () => {
    const newUser = { username: "testuser" };
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(201);
  });

  it("should return 422 error for empty username", async () => {
    const newUser = { username: "" };
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(422);
    expect(response.body.error).toBe(
      "Invalid name, name must be a non-empty string."
    );
  });
});

describe("Users Router - GET /users", () => {
  it("should respond with an array of users and a 200 status code", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: '5', userName: 'Perla' },
      { id: '4', userName: 'Black' }
    ]);
  });
});
