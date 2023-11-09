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
    res.status(201).send({
      gameId: gameRef.id,
      ...gameData,
    });

  } catch (error) {
    next(error);
  }
};
