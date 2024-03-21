import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import Joi from "joi";
import * as geolib from 'geolib';
import admin from "../../config/firebase";
import { GameData } from "../types";
import { getStreetViewImage } from "../services/streetviewService";

const db = admin.firestore();

// Define Joi schema for user ID
const userIdSchema = Joi.object({
  userId: Joi.string().trim().min(1).required()
});

// Define Joi schema for location
const locationSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: userIdError, value: userIdValue } = userIdSchema.validate(req.body);
    const userId = userIdValue.userId.trim();
    
    if (userIdError){
      // If validation fails, return an error response
      return next(createError(422, userIdError.details[0].message));
    }

    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return next (createError(404, "User not found"));
    }

    const currentTime = new Date().getTime()
    
    const streetviewImage = await getStreetViewImage();
    
    const gameData = {
      userId: userId,
      initialTime: currentTime,
      streetViewInfo: streetviewImage,
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
    
    const gamesData: GameData[] = [];

    gameRef.forEach((gameDoc) => {

      gamesData.push({ id: gameDoc.id, ...gameDoc.data()} as GameData)
      
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
    
    const locationValidation = locationSchema.validate({ latitude, longitude });

    if (locationValidation.error) {
      throw createError(422, locationValidation.error.details[0].message);
    }

    const gameRef = db.collection('games').doc(gameId);
    const gameDoc = await gameRef.get();
    
    if (!gameDoc.exists) {
      throw createError(404, `Game ${gameId} not found`);
    }
    
    const currentTime = Date.now();     
    const guessedLocation = { latitude, longitude };
    const initialLocation = gameDoc.data()?.streetViewInfo.initialLocation;

    if (!initialLocation) {
      throw createError(500, 'Initial location not found.');
    }
    const distance = geolib.getDistance(guessedLocation, initialLocation);

    const distanceThreshold = 100;

    const isGuessCorrect = distance <= distanceThreshold;

    const gameData = {
      endTime: currentTime, 
      guessedLocation: guessedLocation,
      distance,
      isGuessCorrect,
      ...gameDoc.data()
    };

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
