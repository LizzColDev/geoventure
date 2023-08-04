import express, { NextFunction, Request, Response } from 'express';
const usersRouter = express.Router();
import createError from 'http-errors';
import {createUser} from '../controllers/userController'

const users = [
  {userId: 1, name: 'Samantha'},
  {userId: 2, name: 'David'},
  {userId: 3, name: 'Santiago'},
  {userId: 4, name: 'Joel'},
]
usersRouter.post('/', createUser);

usersRouter.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.json(users);
});

// usersRouter.get('/:userId', (req: Request, res: Response, next: NextFunction): void => {
//   const foundUser = users.find(user => user.userId === Number(req.params.userId))
//   if(!foundUser) {
//     return next(createError(404, 'Not found'));
//   }
//   res.json(foundUser);
// });


export default usersRouter;