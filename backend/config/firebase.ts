import * as path from 'path';
import * as admin from 'firebase-admin';

// Function to retrieve Firebase credentials based on environment variables or key file
const getFirebaseCredentials = () => {
  if (process.env.FIREBASE_CREDENTIALS) { 
    // Parse credentials from environment variable
    return JSON.parse(process.env.FIREBASE_CREDENTIALS);
  } else if (process.env.FIREBASE_EMULATOR_HOST) {
    // Using the emulator, no real credentials needed
    return null;
  } else {
    // Load credentials from key.json file
    const keyJsonPath = path.resolve(__dirname, '../key.json');
    try {
      return require(keyJsonPath);
    } catch (error) {
      console.error(`Error loading Firebase credentials from ${keyJsonPath}:`, error);
      return null;
    }
  }
};

const serviceAccountKey = getFirebaseCredentials();

if (serviceAccountKey || process.env.FIREBASE_EMULATOR_HOST) {
  // Initialize Firebase Admin SDK with credentials or emulator settings
  admin.initializeApp({
    credential: serviceAccountKey ?
      admin.credential.cert(serviceAccountKey as admin.ServiceAccount) :
      admin.credential.applicationDefault(), 
  });
}

export default admin;
