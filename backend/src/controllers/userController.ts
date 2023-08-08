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
    console.log(usersRef)
    const usersData: any[] = [];
    usersRef.forEach((userDoc)=>{
    console.log(userDoc)

      usersData.push({ id: userDoc.id, ...userDoc.data() });
      console.log('', usersData)
    });
    return res.status(200).json(usersData);
  } catch(error) {
    console.log('error get', error)
    next(error);

  }
}

