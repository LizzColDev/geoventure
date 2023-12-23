import express from 'express';
import { createGame, getGames, getGameById } from '../controllers/gamesController';

const gamesRouter = express.Router();

gamesRouter.post('/game', createGame);
gamesRouter.get('/games', getGames);
gamesRouter.get('/game/:gameId', getGameById);

export default gamesRouter;
