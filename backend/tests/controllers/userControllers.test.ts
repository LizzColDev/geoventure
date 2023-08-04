import { Request, Response, NextFunction } from 'express';
import { mockFirebase   } from 'firestore-jest-mock';
import { mockCollection } from 'firestore-jest-mock/mocks/firestore';

mockFirebase();
mockCollection('users');

import { createUser } from '../../src/controllers/userController';

describe('POST /users', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
req={
  body: {
    name: 'Pepita'
  }
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

  it('should create a user', async () => {

      await createUser(req, res, next);

    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Pepita' }));

    expect(mockCollection).toHaveBeenCalledWith('users');
    
  });
});
