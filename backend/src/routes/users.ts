import express from 'express';
import {createUser, getUsers} from '../controllers/userController'


const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);


export default usersRouter;