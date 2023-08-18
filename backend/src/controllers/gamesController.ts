import { NextFunction, Request, Response } from "express";
import admin from "../../config/firebase";

const db = admin.firestore();

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const currentTime = new Date().getTime()

    const gameData = {
      userId: userId,
      initialTime: currentTime,
    };

    const gameRef = db.collection("users").doc();
    await gameRef.set(gameData);

    res.status(201).send(gameData);

  } catch (error) {
    next(error);
  }
};
