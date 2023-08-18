import express from 'express';
import { createGame } from '../controllers/gamesController';

const gamesRouter = express.Router();

gamesRouter.post('/game', createGame);

export default gamesRouter;
