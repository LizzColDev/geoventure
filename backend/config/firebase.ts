    import * as path from 'path';
    import * as admin from 'firebase-admin';

    const getFirebaseCredentials = () => {
      
      if (process.env.FIREBASE_CREDENTIALS) { 
        return JSON.parse(process.env.FIREBASE_CREDENTIALS);
      } else {
        // Path to the key.json file for GitHub Actions
        const keyJsonPath = path.resolve(__dirname, '../key.json');
        
        try {
          // Attempt to load from key.json locally
          return require(keyJsonPath);
        } catch (error) {
          console.error(`Error loading Firebase credentials from ${keyJsonPath}:`, error);
          return null;
        }
      }
    };

    const serviceAccountKey = getFirebaseCredentials();

    if (serviceAccountKey) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
      });
    }

    export default admin;
