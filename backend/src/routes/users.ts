import express, { NextFunction, Request, Response } from 'express';
const usersRouter = express.Router();
import createError from 'http-errors';
// Get users listing

const users = [
  {userId: 1, name: 'Samantha'},
  {userId: 2, name: 'David'},
  {userId: 3, name: 'Santiago'},
  {userId: 4, name: 'Joel'},
]

// usersRouter.use(express.json())

usersRouter.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.json(users);
});

usersRouter.get('/:userId', (req: Request, res: Response, next: NextFunction): void => {
  const foundUser = users.find(user => user.userId === Number(req.params.userId))
  if(!foundUser) {
    return next(createError(404, 'Not found'));
  }
  res.json(foundUser);
});

usersRouter.post('/', (req: Request, res: Response, next: NextFunction): void =>{
  const { body } = req;
  if(typeof body.name !== 'string') {
    return next(createError(422, 'Validation error'));
  }
  const newUser = {
    userId: users.length + 1,
    name: body.name
  };

  users.push(newUser);

  res.status(201).json(users);
})
export default usersRouter;