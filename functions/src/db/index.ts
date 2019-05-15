import { config } from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp(config().firebase);

// In Development
// const serviceAccount = require('../../../yalm.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

export const db = admin.firestore();

export const auth = admin.auth();