// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const key = process.env.APIKEY
const appId = process.env.APP_ID
const firebaseConfig = {
    apiKey: `${key}`,
    authDomain: "wondercrafts-595a9.firebaseapp.com",
    projectId: "wondercrafts-595a9",
    storageBucket: "wondercrafts-595a9.appspot.com",
    messagingSenderId: "775624794218",
    appId: `${appId}`,
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
