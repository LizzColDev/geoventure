import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import admin from "../../config/firebase";

const db = admin.firestore();

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    if (
      !userId ||
      typeof userId !== "string" ||
      userId.trim().length === 0
    ) {
      return next(
        createError(422, "Invalid userId. userId must be a non-empty string.")
        )
    }

    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return next(
        createError(404, "User not found")
        );
    }

    const currentTime = new Date().getTime()

    const gameData = {
      userId: userId,
      initialTime: currentTime,
    };

    const gameRef = await db.collection("games").add(gameData);
    if (!gameRef.id) {
      return next(
        createError(500, "Error creating the game. Please try again.")
      );
    }
    res.status(201).send({
      gameId: gameRef.id,
      ...gameData,
    });
    console.log(`Game created successfully - Game ID: ${gameRef.id}`);
  } catch (error) {
    next(error);
  }
};

export const getGames =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const gameRef = await db.collection('games').get();
    
    const gamesData: any[] = [];

    gameRef.forEach((gameDoc) => {

      gamesData.push({ id: gameDoc.id, ...gameDoc.data()
      
      })
    });

    if (gamesData.length === 0 ) {
      return next(
        createError(404, "Not games found.")
      )
    }
    return res.status(200).json(gamesData);
  } catch (error) {
    next(error);
  }
}

export const getGameById =async (req:Request, res: Response, next: NextFunction) => {
  
  try {
    const gameId = req.params.gameId;
    const gameDoc = await db.collection('games').doc(gameId).get();

    if (!gameDoc.exists) {
      return next(createError(404, "Game not found."));
    };

    const gameData = gameDoc.data();
    return res.status(200).json({id: gameDoc.id, ...gameData})

  } catch (error) {
    next(error);
  }
}

export const updateGameById =async (req:Request, res: Response, next: NextFunction) => {

    try {
      const {gameId} = req.params;
      const { latitude, longitude } = req.body;

      if (
        !latitude ||
        !longitude ||
        typeof latitude !== 'number' ||
        typeof longitude !== 'number'
      ) {
        return next(
          createError(422, 'Invalid latitude or longitude. Both must be numbers.')
        );
      }


      const gameRef = db.collection('games').doc(gameId);
      const gameDoc = await gameRef.get();
      
      if (!gameDoc.exists) {
        return next(createError(404, `Game ${gameId} not found`));
      }
      
      const currentTime = Date.now();     
      const gameData = {
        endTime: currentTime, 
        estimatedLocation: { latitude, longitude },
        ...gameDoc.data()};

      await gameRef.set(gameData)

      res.status(201).json({id: gameDoc.id, ...gameData });

      console.log(`Game updated successfully - Game ID: ${gameDoc.id}`);
    } catch (error) {
      next(error);
    }
}

export const deleteGameById =async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameId = req.params.gameId;
    const gameRef = db.collection("games").doc(gameId);
    const gameDoc = await gameRef.get()

    if (!gameDoc.exists) {
      throw createError(404, "Game not found.");
    }

    await gameRef.delete();
    res.status(204).json({
      id: gameId,
    });
  } catch (error) {
    next(error);
  }  
}
