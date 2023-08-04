import request from 'supertest';
import express, { Express } from 'express';
import usersRouter from '../../src/routes/users';

const app: Express = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('Users Router', () => {
  it('should create a new user with status 201', async () => {
    const newUser = {
      name: 'John Doe',
    };

    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
  });

});
