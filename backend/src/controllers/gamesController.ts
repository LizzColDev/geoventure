import { NextFunction, Request, Response } from "express";
import admin from "../../config/firebase";

const db = admin.firestore();

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    if (userId === undefined || userId === "") {
      return res.status(400).json({ error: 'userId is required' });
    }

    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
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
