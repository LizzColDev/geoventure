import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import * as admin from "firebase-admin";
import * as serviceAccount from '../../key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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

export const getUsers =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const usersRef = await db.collection('users').get();
    const usersData: any[] = [];
    usersRef.forEach((userDoc)=>{

      usersData.push({ id: userDoc.id, ...userDoc.data() });
    });

    if (usersData.length === 0) {
      return next(
        createError(404, "Not users found.")
      );
    }
    
    return res.status(200).json(usersData);
  } catch(error) {
    next(error);

  }
}

export const getUserById =async (req:Request, res: Response, next: NextFunction) => {
  
  try {
    const userId = req.params.userId;

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return next(createError(404, "User not found."));
    }

    const userData = userDoc.data();
    return res.status(200).json({ id: userDoc.id, ...userData });

  } catch (error) {
    next(error);
  }

}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get()

    if(!userDoc.exists) {
      throw createError(404, "User not found.");
    }

    await userRef.delete(userDoc);
    res.status(204).json({
      id: userId,
    });

  } catch (error) {
    next(error);
  }
};