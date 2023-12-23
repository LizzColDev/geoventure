import express from 'express';
import { createGame, getGames } from '../controllers/gamesController';

const gamesRouter = express.Router();

gamesRouter.post('/game', createGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;
