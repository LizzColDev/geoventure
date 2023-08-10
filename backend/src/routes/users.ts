import express from 'express';
import {createUser, getUsers, getUserById} from '../controllers/userController'


const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);



export default usersRouter;