import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import Joi from "joi";
import admin from "../../config/firebase";
import { UserData } from "../types";

const db = admin.firestore();

// Define Joi schema for user creation
const userSchema = Joi.object({
  name: Joi.string().trim().min(1).required()
});

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { error, value } = userSchema.validate(req.body);

    if (error){
      // If validation fails, return an error response
      return next(createError(422, error.details[0].message));
    }

    // If validation passes, proceed to create the user
    const newUser = {
      name: value.name.trim(),
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
    const usersData: UserData [] = [];
    usersRef.forEach((userDoc)=>{

      usersData.push({ id: userDoc.id, ...userDoc.data() } as UserData );
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

    await userRef.delete();
    res.status(204).json({
      id: userId,
    });

  } catch (error) {
    next(error);
  }
};