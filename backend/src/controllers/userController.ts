import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import admin from 'firebase-admin';
const credentials = require('../../key.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      return next(createError(422, 'Invalid name. Name must be a non-empty string.'));
    }
    const newUser = {
      userId: 0,
      name: body.name.trim(),
    };

    const docRef =  await db.collection('users').add(newUser);
    newUser.userId = Number(docRef.id);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


export { createUser };
