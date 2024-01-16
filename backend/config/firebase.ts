import * as admin from 'firebase-admin';
import * as serviceAccount from '../key.json';

const serviceAccountKey = process.env.FIREBASE_CREDENTIALS
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS)
  : serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

export default admin;
