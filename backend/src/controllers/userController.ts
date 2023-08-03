import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import * as admin from 'firebase-admin';
import keyData from '../../key.json';
import { generateCustomId } from '../utils/customIds';

const params = {
  type: keyData.type,
  projectId: keyData.project_id,
  privateKeyId: keyData.private_key_id,
  privateKey: keyData.private_key,
  clientEmail: keyData.client_email,
  clientId: keyData.client_id,
  authUri: keyData.auth_uri,
  tokenUri: keyData.token_uri,
  authProviderX509CertUrl: keyData.auth_provider_x509_cert_url,
  clientC509CertUrl: keyData.client_x509_cert_url
}

admin.initializeApp({
  credential: admin.credential.cert(params)
});

const db = admin.firestore();

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      return next(createError(422, 'Invalid name. Name must be a non-empty string.'));
    }

    const customUserId = generateCustomId()

    const newUser = {
      userId: customUserId,
      name: body.name.trim(),
    };

    await db.collection('users').doc(customUserId).set(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


export { createUser };
