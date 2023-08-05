import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import * as admin from "firebase-admin";

const FIREBASE_KEY_JSON_PATH = process.env.FIREBASE_KEY_JSON_PATH || "/app/key.json";
admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_KEY_JSON_PATH),
});

const db = admin.firestore();

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    if (
      !body.name ||
      typeof body.name !== "string" ||
      body.name.trim().length === 0
    ) {
      return next(
        createError(422, "Invalid name. Name must be a non-empty string.")
      );
    }

    const newUser = {
      name: body.name.trim(),
    };

    const documentREference = await db.collection("users").add(newUser);

    res.status(201).json({
      id: documentREference.id,
      ...newUser,
    });
  } catch (error) {
    next(error);
  }
};

export { createUser };
