import express from 'express';
import { createGame, getGames, getGameById, updateGameById, deleteGameById } from '../controllers/gamesController';

const gamesRouter = express.Router();

gamesRouter.post('/game', createGame);
gamesRouter.get('/games', getGames);
gamesRouter.get('/game/:gameId', getGameById);
gamesRouter.patch('/game/:gameId', updateGameById);
gamesRouter.delete('/game/:gameId', deleteGameById);

export default gamesRouter;
