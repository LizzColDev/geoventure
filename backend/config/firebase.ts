import * as path from 'path';
import * as admin from 'firebase-admin';

const initializeFirebaseApp = async () => {
  try {
    let serviceAccountKey = null;

    // Check if Firebase credentials are provided via environment variable
    if (process.env.FIREBASE_CREDENTIALS) {
      serviceAccountKey = JSON.parse(process.env.FIREBASE_CREDENTIALS);
      console.log('Firebase credentials found. Using Firebase.');
    } else {
      // Load Firebase credentials from a key.json file
      const keyJsonPath = path.resolve(__dirname, '../key.json');
      serviceAccountKey = require(keyJsonPath);
      console.log('Firebase credentials found. Using Firebase.');
    }
    // Initialize Firebase Admin SDK with the retrieved credentials
    if (serviceAccountKey) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
      });
    } else {
      throw new Error('Failed to initialize Firebase credentials.');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Fallback to Firestore emulator configuration if Firebase initialization fails
    const projectId = process.env.FIREBASE_PROJECT
    const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST;

    console.log('Using Firestore emulator.');
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: projectId,
      databaseURL: `http://${firestoreHost}?ns=${projectId}`
    });
  }
};

// Initialize Firebase app and handle success/failure
initializeFirebaseApp()

export default admin;