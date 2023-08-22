import express from 'express';
import {createUser, getUsers, getUserById, deleteUser} from '../controllers/userController'


const usersRouter = express.Router();

usersRouter.post('/user', createUser);
usersRouter.get('/users', getUsers);
usersRouter.get('/user/:userId', getUserById);
usersRouter.delete('/user/:userId', deleteUser)



export default usersRouter;