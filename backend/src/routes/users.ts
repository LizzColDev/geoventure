import express from 'express';
import {createUser, getUsers, getUserById} from '../controllers/userController'


const usersRouter = express.Router();

usersRouter.post('/user', createUser);
usersRouter.get('/users', getUsers);
usersRouter.get('/user/:userId', getUserById);



export default usersRouter;