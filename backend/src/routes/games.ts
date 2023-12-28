import express from 'express';
import { createGame, getGames, getGameById, updateGameById } from '../controllers/gamesController';

const gamesRouter = express.Router();

gamesRouter.post('/game', createGame);
gamesRouter.get('/games', getGames);
gamesRouter.get('/game/:gameId', getGameById);
gamesRouter.patch('/game/:gameId', updateGameById);
export default gamesRouter;
